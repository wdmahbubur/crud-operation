const mongoose = require('mongoose');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Token = require("./token.model");

const adminSchema = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    }
}, {
    timestamps: true
})


adminSchema.pre("save", async function (next) {
    if (!this.isModified) {
        next();
    }

    if (!this.password) {
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

adminSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

adminSchema.methods.createAccessToken = async function () {
    try {
        const accessToken = jwt.sign({ id: this._id }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: "1m"
        })
        return accessToken;
    }
    catch (err) {
        console.log(err);
        throw new Error(err.message)
    }
}

adminSchema.methods.createRefreshToken = async function () {
    try {
        const refreshToken = jwt.sign({ id: this._id }, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: "1d"
        })
        await new Token({ token: refreshToken }).save();
        return refreshToken;
    }
    catch (err) {
        console.log(err);
        throw new Error(err.message)
    }
}


const model = mongoose.model("Admin", adminSchema);
module.exports = model;