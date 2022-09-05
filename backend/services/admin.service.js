const Admin = require("../models/admin.model");

exports.save = async (document) => {
    try {
        const newAdmin = new Admin(document);
        const admin = await newAdmin.save();
        return admin;
    }
    catch (err) {
        console.log(err.message);
        if (err.code === 11000) {
            if (err.keyValue?.email) {
                throw new Error("Email already exist");
            }
        }
        else {
            throw new Error(err.message.split(":")[2]);
        }
    }
}

exports.findOne = async (query) => {
    try {
        const admin = await Admin.findOne(query);
        return admin;
    }
    catch (err) {
        console.log(err.message);
        throw new Error(err.message.split(":")[2]);
    }
}