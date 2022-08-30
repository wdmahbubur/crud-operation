const User = require("../models/user.model");

const create = async (document) => {
    try {
        const result = await User.create(document);
        return result;
    } catch (err) {
        console.log(err);
        if (err.code === 11000) {
            if (err.keyValue?.username) {
                throw new Error("Username already exist");
            }
            if (err.keyValue?.email) {
                throw new Error("Email already exist");
            }
        }
        else {
            throw new Error(err.message.split(":")[2]);
        }
    }
}

module.exports = {
    create
};