const mongoose = require('mongoose');

const mongo = () => {
    mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
    })
        .then(() => {
            console.log("MongoDB Connected Success")
        })
        .catch(err => {
            console.log("Connecting Failed!")
        })
}

module.exports = mongo;
