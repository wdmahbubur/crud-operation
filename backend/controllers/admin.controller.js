const { save, findOne } = require("../services/admin.service");

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


        res.status(200).cookie("refreshToken", refreshToken, {
            expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
            // Forces to use https in production
            secure: process.env.NODE_ENV === 'production' ? true : false
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