const userModel = require("../models/UserModel");

function register(req, res) {
    const user = new userModel({
        username : req.body.username,
        password : req.body.password,
        email : req.body.email,
        phone : req.body.phone,
        street : req.body.street,
        zipCode : req.body.zipCode,
        city : req.body.city,
        country : req.body.country,
        info : req.body.info,
        image : req.body.image
    });
    user.save().then(() => {
        console.log('Einträge wurden erstellt.');
    });
}

module.exports = {
    register
};