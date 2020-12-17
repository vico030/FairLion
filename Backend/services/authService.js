const userModel = require("../models/UserModel");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const sendEmail = require("./emailVerification");

const privateAuthKey = process.env.PRIVATE_AUTH_KEY;
const privateRefreshKey = process.env.PRIVATE_REFRESH_KEY;

const registerUser = (body) => {
    return new Promise(async (resolve, reject) => {
        try {
            const verificationHash = crypto.randomBytes(64).toString("hex") //random hash
            body.verificationHash = verificationHash;

            const user = new userModel(body);
            const savedUser = await user.save();
            generateTokens({ username: savedUser.username, userId: savedUser._id }, { expiresIn: "3d" }, async (err, authToken, refreshToken) => {
                if (err) return res.status(500).send("Internal Server error.");
                //sendEmail(req.body.email, verificationHash);
                await userModel.findOneAndUpdate({ username: user.username }, { refreshToken }) //we dont care about the response, set refreshToken
                /*return res.status(201).json({
                    data: { userId: user._id, username: user.username },
                    //message: "Verify your account please. We have sent you an email."
                    message: "Succesfully created account."
                })*/
                sendEmail(savedUser.email, savedUser.verificationHash);
                return resolve({
                    data: { userId: savedUser._id, username: savedUser.username },
                    status: 201,
                    message: "Successfully created user.",
                    refreshToken,
                    authToken
                })
            })
        } catch (err) {
            console.log(err)
            return reject(handleNewUserError(err))
        }
    })
}

const loginUser = ({ username, password }) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await userModel.findOne({ username });
            if (!user) return reject({ data: [], message: "User does not exist.", status: 200 })
            user.comparePasswords(password, err => {
                if (err) {
                    if (err === true) return reject({ error: "Password invalid", status: 400, message: "Password invalid" }); //passwords arent equal
                    else return reject({ error: err, status: 500, message: "Internal Server Error. Try later again." }); //some unexpected error
                }
                //check if verified
                if (!user.isVerified) return reject({ error: null, status: 401, message: "Please verify your email address first." })
                generateTokens({ username: user.username, userId: user._id }, { expiresIn: "30d" }, async (err, authToken, refreshToken) => {
                    if (err) return reject({ error: err, status: 500, message: "Internal Server Error. Try later again." }); //some unexpected error
                    try {
                        const newUser = await userModel.findOneAndUpdate({ username: user.username }, { refreshToken }).select('-password');
                        return resolve({ data: newUser, status: 200, message: "Successfully logged in", authToken, refreshToken });
                    }
                    catch (err) {
                        return reject({ error: err, status: 500, message: "Internal Server Error. Try later again." })
                    }
                })
            })
        }
        catch (err) {
            return reject({ error: err, message: "Server error. Try later again.", status: 500 })
        }
    })
}

const verifyUser = hash => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await userModel.findOneAndUpdate({ verificationHash: hash }, { isVerified: true, $unset: { verificationHash: "" } })
            return resolve({ data: user, status: 200, message: "Successfully verified user." });
        }
        catch (err) {
            console.log(err);
            return reject({ error: err, message: "Server error. Try later again.", status: 500 })
        }
    })
}

const resetPassword = email => {
    return new Promise(async (resolve, reject) => {
        try {
            const newPassword = generateUID();
            const user = await userModel.findOne({ email });
            if (!user) return reject({ error: null, message: "User does not exist.", status: 200 });
            //await userModel.findOneAndUpdate({ email }, { password: newPassword });
            user.overwrite({ ...user.toObject(), password: newPassword });
            await user.save()
            sendEmail(user.email, newPassword, "pwreset");
            return resolve({ data: null, message: "Successfully reset password.", status: 200 });
        }
        catch (err) {
            console.log(err);
            return reject({ error: err, message: "Server error. Try later again.", status: 500 })
        }
    })
}

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
    if (!req.cookies.authToken || !req.cookies.refreshToken) return res.status(401).send("Please Login first"); //no cookie
    try {
        const { authToken } = req.cookies;
        const { username, userId } = jwt.verify(authToken, privateAuthKey); //just checking for an exception
        req.username = username;
        req.userId = userId;
        return next(); //valid key
    }
    catch (err) {
        if (err.message === "jwt expired") {
            try { //if authToken not valid, check if refreshToken is valid
                const { refreshToken } = req.cookies;
                const decoded = jwt.verify(refreshToken, privateRefreshKey);
                //if verified refreshToken
                const user = await userModel.findOne({ username: decoded.username });
                if (user.refreshToken === refreshToken) { //database refreshToken === given refreshToken from cookies
                    generateAuthToken({ username: decoded.username, userId: decoded.userId }, privateAuthKey, (err, newAuthToken) => {
                        if (err) return res.status(500).send("Internal Server Error. Please try later again.");
                        res.cookie("authToken", newAuthToken, { httpOnly: true, maxAge: 9999999999 });
                        req.username = decoded.username;
                        req.userId = decoded.userId;
                        return next();
                    })
                }
                else { //if tokens arent same
                    console.log(user.refreshToken, refreshToken);
                    res.status(401).send("Access denied, refreshToken");
                }
            }
            catch (err) { //if jwt error on refreshToken
                console.log(err)
                if (err.message === "jwt expired") return res.status(401).send("Please Login.");
                else return res.status(401).send("Access denied, refreshToken");
            }
        }
        else { //some other jwt error
            return res.status(401).send("Access denied, authToken. Please Login.");
        }
    }
}


function handleNewUserError(err) {
    if (err.code === 11000) { //err code for duplication
        //err.keyPattern object with attributes that are duplicates
        if (err.keyPattern.username) return ({
            error: err,
            message: "Username is already in use.",
            status: 409
        }) //409 == conflict
        else if (err.keyPattern.email) return ({
            error: err,
            message: "Email is already in use",
            status: 409
        }) //409 == conflict
    } else if (err.name === 'ValidationError') { //err.errors == list of attributes that had this error
        //if username validation error
        if (err.errors.username) {
            if (err.errors.username.kind === "minlength")
                return ({
                    error: err,
                    message: "Username must be at least 4 letters and max 15 letters long",
                    status: 400
                }) //400 == client side error}
            return ({
                error: err,
                message: "Special characters not valid for username. Characters from the alphabet and numbers are allowed.",
                status: 400
            })
        }
        //if email validation error
        return ({
            error: err,
            message: "Email does not have a valid format.",
            status: 400
        }) //400 == client side error}
    }
    return ({
        error: err,
        message: "Something went wrong. Try later again.",
        status: 500
    }) //server error
}

const generateAuthToken = (userDetails, key, callback) => {
    jwt.sign(userDetails, key, { expiresIn: "5m" }, (err, result) => {
        if (err) return callback(err);
        callback(null, result)
    })
}

const generateTokens = (userDetails, options, callback) => {
    jwt.sign(userDetails, privateAuthKey, { expiresIn: "5m" }, (err, authToken) => { //generate authToken
        if (err) return callback(err);
        jwt.sign(userDetails, privateRefreshKey, options, (err, refreshToken) => {
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
    resetPassword
};