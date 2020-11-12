const userModel = require("../models/UserModel");

const registerUser = (body) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = new userModel({
                ...body
            });
            const savedUser = await user.save();
            return resolve({
                data: savedUser,
                status: 201,
                message: "Successfully created user."
            })
        } catch (err) {
            return reject(handleNewUserError(err))
        }
    })
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

module.exports = {
    registerUser
};