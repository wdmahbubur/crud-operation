const User = require("../models/user.model");
const { options } = require("../routes/v1/user.route");

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

const gets = async (document) => {
    try {
        const users = await User.find(document);
        return users
    }
    catch (err) {
        console.log(err)
        throw new Error(err.message);
    }
}

const getById = async (id) => {
    try {
        const user = await User.findById(id);
        return user
    }
    catch (err) {
        console.log(err)
        throw new Error(err.message);
    }
}

const update = async (id, document, options) => {
    try {
        const update = await User.findByIdAndUpdate(id, document, options);
        return update
    }
    catch (err) {
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

const remove = async (id) => {
    try {
        const user = await User.findByIdAndDelete(id);
        return user
    }
    catch (err) {
        console.log(err);
        throw new Error(err.message.split(":")[2]);

    }
}

module.exports = {
    create,
    gets,
    getById,
    update,
    remove
};