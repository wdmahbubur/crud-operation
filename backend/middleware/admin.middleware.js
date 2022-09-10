const jwt = require("jsonwebtoken");

const Admin = require("../models/admin.model");
const Token = require("../models/token.model");

const verifyAccessToken = async (req, res, next) => {
    try {
        let token = req.headers['authorization'];
        if (token && token.startsWith("Bearer ")) {
            try {
                token = token.split(" ")[1];

                const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
                req.admin = await Admin.findById(decoded.id);
                next();
            }
            catch (err) {
                return res.status(401).json({ message: "Unauthorized user" });
            }
        }
        else {
            return res.status(400).json({ message: "Invalid request" });
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message })
    }
}

const verifyRefreshToken = async (req, res, next) => {
    try {
        let token = req.cookies.refreshToken;
        if (!token) {
            throw new Error("No token found!")
        }
        if (token) {
            try {
                const tokenDoc = await Token.findOne({ token: token });
                if (!tokenDoc) {
                    throw new Error("Unauthorized token")
                }
                const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
                req.admin = await Admin.findById(decoded.id);
                next();
            }
            catch (err) {
                return res.status(401).json({ message: "Unauthorized user" });
            }
        }
    }
    catch (err) {
        console.log(err.message);
        res.status(500).json({ message: err.message })
    }
}



module.exports = {
    verifyAccessToken, verifyRefreshToken
}