const mongoose = require('mongoose');

const tokenSchema = new mongoose.Schema({
    token: {
        type: String
    }
}, {
    timestamps: true
});

const model = mongoose.model("Token", tokenSchema);
module.exports = model;