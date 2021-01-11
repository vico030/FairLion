const { ObjectId } = require("mongoose");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema(
    {
        username: { type: String, required: true, dropDups: true },
        password: { type: String, required: true },
        email: { type: String, unique: true, required: true, dropDups: true },
        phone: {type: String, required: true},
        street: {type: String, required: true},
        zipCode: {type: String, required: true},
        city: {type: String, required: true},
        country: {type: String, required: true},
        info: {type: String, required: true},
        image: {type: String, default: "files\\default_profile.png"},
        friends: {
            type: [ObjectId],
            default: []
        },
        favourites: {
            type: [ObjectId],
            default: []
        },
        refreshToken: {
            type: String
        },
        isVerified: {
            type: Boolean,
            default: false
        },
        verificationHash: {
            type: String
        }
    });

//cant use arrow functions -> user.isModified is not a function
userSchema.pre("save", function (next) { //is executed before saving a new document, this === the user that is about to be saved
    const user = this; //the modified user that is about to be saved
    if (user.isModified("password")) { //new user password is different than old one
        bcrypt.genSalt(10, (err, salt) => {
            if (err) return next(err)//pass error to next middleware
            bcrypt.hash(user.password, salt, (err, hash) => {
                if (err) return next(err)//pass error to next middleware
                user.password = hash; //set hashed password
                return next();
            })
        })
    }
    else next(); //if not modified password
})

userSchema.methods.comparePasswords = function (incomingPassword, callback) {
    const userPassword = this.password; //this == user
    bcrypt.compare(incomingPassword, userPassword, (err, success) => {
        if (err) return callback(err);
        else if (success) return callback(null);
        return callback(true); //error
    })
}


module.exports = mongoose.model("User", userSchema);