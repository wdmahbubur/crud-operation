const User = require("../models/user.model");

const { create } = require("../services/user.service");

exports.addUser = async (req, res) => {
    try {
        const document = {
            name: req.body.name,
            username: req.body.username,
            email: req.body.email,
            phone: req.body.phone
        }
        const newUser = await create(document);

        res.status(200).json({
            message: "New User Created Successful",
            user: newUser
        })

    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: err.message
        })
    }
}