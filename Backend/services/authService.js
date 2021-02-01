const userModel = require("../models/UserModel");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const sendEmail = require("./emailVerification");
const fs = require('fs');

const privateAuthKey = process.env.PRIVATE_AUTH_KEY;
const privateRefreshKey = process.env.PRIVATE_REFRESH_KEY;

const registerUser = (body) => {
    return new Promise(async (resolve, reject) => {
        try {
            const verificationHash = crypto.randomBytes(64).toString("hex") //random hash
            body.verificationHash = verificationHash;

            const user = new userModel(body);
            const savedUser = await user.save();
            generateTokens({ email: savedUser.email, userId: savedUser._id }, async (err, authToken, refreshToken) => {
                if (err) return res.status(500).send("Interner Server Fehler.");
                //sendEmail(req.body.email, verificationHash);
                var newUser = await userModel.findOneAndUpdate({ email: user.email }, { refreshToken }).select("-password") //we dont care about the response, set refreshToken
                /*return res.status(201).json({
                    data: { userId: user._id, username: user.username },
                    //message: "Verify your account please. We have sent you an email."
                    message: "Succesfully created account."
                })*/
                console.log(authToken);
                sendEmail(savedUser.email, savedUser.verificationHash, "confirm", savedUser.username);
                return resolve({
                    data: newUser,//{ userId: savedUser._id, username: savedUser.username },
                    status: 201,
                    message: "User wurde erstellt.",
                    refreshToken,
                    authToken
                })
            })
        } catch (err) {
            console.log(err)
            if (body.image) {
                // Delete image in storage
                fs.unlink(body.image, (err) => {
                    // in case of error, skip and continue
                });
            }
            return reject(handleNewUserError(err))
        }
    })
}

const loginUser = ({ email, password }) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await userModel.findOne({ email });
            if (!user) return reject({ data: [], message: "User existiert nicht.", status: 401 })
            user.comparePasswords(password, err => {
                if (err) {
                    if (err === true) return reject({ error: "Password invalid", status: 400, message: "Passwort ungültig." }); //passwords arent equal
                    else return reject({ error: err, status: 500, message: "Interner Server Fehler. Versuche es später noch einmal." }); //some unexpected error
                }
                //check if verified
                if (!user.isVerified) return reject({ error: null, status: 401, message: "Bitte bestätige zuerst deine Email-Adresse." })
                generateTokens({ email: user.email, userId: user._id }, async (err, authToken, refreshToken) => {
                    if (err) return reject({ error: err, status: 500, message: "Interner Server Fehler. Versuche es später noch einmal." }); //some unexpected error
                    try {
                        const newUser = await userModel.findOneAndUpdate({ email: user.email }, { refreshToken }).select('-password');
                        return resolve({ data: newUser, status: 200, message: "Erfolgreich eingeloggt.", authToken, refreshToken });
                    }
                    catch (err) {
                        return reject({ error: err, status: 500, message: "Interner Server Fehler. Versuche es später noch einmal." })
                    }
                })
            })
        }
        catch (err) {
            return reject({ error: err, message: "Interner Server Fehler. Versuche es später noch einmal.", status: 500 })
        }
    })
}

const verifyUser = hash => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await userModel.findOneAndUpdate({ verificationHash: hash }, { isVerified: true, $unset: { verificationHash: "" } })
            return resolve({ data: user, status: 200, message: "User erfolgreich verifiziert." });
        }
        catch (err) {
            console.log(err);
            return reject({ error: err, message: "Interner Server Fehler. Versuche es später noch einmal.", status: 500 })
        }
    })
}

const resetPassword = email => {
    return new Promise(async (resolve, reject) => {
        try {
            const newPassword = generateUID();
            const user = await userModel.findOne({ email });
            if (user) {
                user.overwrite({ ...user.toObject(), password: newPassword });
                await user.save();
            }
            sendEmail(user.email, newPassword, "pwreset");
            return resolve({ data: null, message: "Passwort erfolgreich zurückgesetzt", status: 200 });
        }
        catch (err) {
            console.log(err);
            return reject({ error: err, message: "Interner Server Fehler. Versuche es später noch einmal.", status: 500 })
        }
    })
}

const changePassword = ({ email, password }) => {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await userModel.findOne({ email });
        if (user) {
          user.overwrite({ ...user.toObject(), password: password });
          await user.save();
        }
        return resolve({ data: null, message: "Password wurde erfolgreich geändert.", status: 200 });
      } catch (err) {
        console.log(err);
        return reject({ error: err, message: "Interner Server Fehler. Versuche es später noch einmal.", status: 500 });
      }
    });
  };

function generateUID() {
    // I generate the UID from two parts here 
    // to ensure the random number provide enough bits.
    var firstPart = (Math.random() * 46656) | 0;
    var secondPart = (Math.random() * 46656) | 0;
    firstPart = ("000" + firstPart.toString(36)).slice(-3);
    secondPart = ("000" + secondPart.toString(36)).slice(-3);
    return firstPart + secondPart;
}

//idee cookie has long expiration date, jwt expiration short, so a hacker cant use the token for more than 5 minutes, if he manages to get the token
const isAuthenticated = async (req, res, next) => {
    if (!req.cookies.authToken || !req.cookies.refreshToken) return res.status(401).send("Bitte zuerst einloggen."); //no cookie
    try {
        const { authToken } = req.cookies;
        const { email, userId } = jwt.verify(authToken, privateAuthKey); //just checking for an exception
        req.email = email;
        req.userId = userId;
        return next(); //valid key
    }
    catch (err) {
        if (err.message === "jwt expired") {
            try { //if authToken not valid, check if refreshToken is valid
                const { refreshToken } = req.cookies;
                const decoded = jwt.verify(refreshToken, privateRefreshKey);
                //if verified refreshToken
                const user = await userModel.findOne({ email: decoded.email });
                if (user.refreshToken === refreshToken) { //database refreshToken === given refreshToken from cookies
                    generateAuthToken({ email: decoded.eamil, userId: decoded.userId }, privateAuthKey, (err, newAuthToken) => {
                        if (err) return res.status(500).send("Interner Server Fehler. Versuche es später noch einmal.");
                        res.cookie("authToken", newAuthToken, { httpOnly: true, maxAge: 9999999999 });
                        req.email = decoded.eamil;
                        req.userId = decoded.userId;
                        return next();
                    })
                }
                else { //if tokens arent same
                    console.log(user.refreshToken, refreshToken);
                    res.status(401).send("Zugriff verweigert, refreshToken abgelaufen.");
                }
            }
            catch (err) { //if jwt error on refreshToken
                console.log(err)
                if (err.message === "jwt expired") return res.status(401).send("Bitte einloggen.");
                else return res.status(401).send("Zugriff verweigert, refreshToken abgelaufen.");
            }
        }
        else { //some other jwt error
            return res.status(401).send("Zugriff verweigert, AuthToken abgelaufen. Bitte einloggen.");
        }
    }
}


function handleNewUserError(err) {
    if (err.code === 11000) { //err code for duplication
        //err.keyPattern object with attributes that are duplicates
        /* if (err.keyPattern.username) return ({
            error: err,
            message: "Username is already in use.",
            status: 409
        }) //409 == conflict
        else */ if (err.keyPattern.email) return ({
            error: err,
            message: "Email ist bereits registriert.",
            status: 409
        }) //409 == conflict
    } else if (err.name === 'ValidationError') { //err.errors == list of attributes that had this error
        //if username validation error
        if (err.errors.username) {
            if (err.errors.username.kind === "minlength")
                return ({
                    error: err,
                    message: "Username muss zwischen 4 und 15 Zeichen lang sein.",
                    status: 400
                }) //400 == client side error}
            return ({
                error: err,
                message: "Sonderzeichen sind beim Username nicht erlaubt. Bitte verwende alphanumerische Zeichen.",
                status: 400
            })
        }
        //if email validation error
        return ({
            error: err,
            message: "Email hat nicht das korrekte Format.",
            status: 400
        }) //400 == client side error}
    }
    return ({
        error: err,
        message: "Interner Server Fehler. Versuche es später noch einmal.",
        status: 500
    }) //server error
}

const generateAuthToken = (userDetails, key, callback) => {
    jwt.sign(userDetails, key, { expiresIn: "3d" }, (err, result) => {
        if (err) return callback(err);
        callback(null, result)
    })
}

const generateTokens = (userDetails, callback) => {
    jwt.sign(userDetails, privateAuthKey, { expiresIn: "3d" }, (err, authToken) => { //generate authToken
        if (err) return callback(err);
        jwt.sign(userDetails, privateRefreshKey, { expiresIn: "30d" }, (err, refreshToken) => {
            if (err) callback(err);
            callback(null, authToken, refreshToken);
        })
    })
}



module.exports = {
    registerUser,
    isAuthenticated,
    loginUser,
    verifyUser,
    resetPassword,
    changePassword,
};