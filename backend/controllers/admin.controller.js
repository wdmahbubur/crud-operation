const { save, findOne } = require("../services/admin.service");
const Token = require("../models/token.model");

exports.createAdmin = async (req, res) => {
    try {
        const document = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        }
        const newAdmin = await save(document);
        res.status(201).json({
            message: "New admin created successful",
            admin: newAdmin
        });
    }
    catch (err) {
        console.log(err.message);
        res.status(500).json({
            message: err.message
        })
    }
}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || email === null) {
            return res.status(400).json({ message: "Email is required" });
        }

        if (!password || password === null) {
            return res.status(400).json({ message: "Password is required" });
        }

        const query = { email: email };
        const admin = await findOne(query);
        if (!admin) {
            return res.status(404).json({ message: "This email is not found!" });
        }
        const isPasswordMatch = await admin.matchPassword(password);
        if (!isPasswordMatch) {
            return res.status(400).json({ message: "Password is incorrect!" });
        }

        const accessToken = await admin.createAccessToken();
        const refreshToken = await admin.createRefreshToken();

        res.cookie("refreshToken", refreshToken, {
            expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
            // httpOnly: true,
            // Forces to use https in production
            // secure: process.env.NODE_ENV === 'production' ? true : false
            secure: true,
            sameSite: 'none'
        }).json({
            message: "Admin login successful",
            admin: admin,
            accessToken, refreshToken
        });
    }
    catch (err) {
        console.log(err.message);
        res.status(500).json({
            message: err.message
        })
    }
}

exports.getLoggedAdmin = async (req, res) => {
    try {
        const admin = req.admin;
        const accessToken = await admin.createAccessToken();

        res.status(200).json({
            admin,
            accessToken
        })
    }
    catch (err) {
        console.log(err.message);
        res.status(500).json({
            message: err.message
        })
    }
}


exports.generateAccessToken = async (req, res) => {
    try {
        const admin = req.admin;
        const accessToken = await admin.createAccessToken();

        res.status(200).json({
            accessToken
        })
    }
    catch (err) {
        console.log(err.message);
        res.status(500).json({
            message: err.message
        })
    }
}


exports.logout = async (req, res) => {
    try {
        let token = req.cookies.refreshToken;
        if (!token) {
            return res.status(404).json({ message: "User already logged out" })
        }
        const verifyToken = await Token.findOneAndDelete({ token: token });
        if (verifyToken) {
            return res.clearCookie("refreshToken", {
                secure: true,
                sameSite: 'none'
            }).json({ message: "Logged Out Successful" });
        }
        return res.json({ message: "Invalid Token" });
    }
    catch (err) {
        console.log(err.message);
        res.status(500).json({ message: "An error while logout admin" });
    }
}