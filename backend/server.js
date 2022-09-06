const express = require('express');
const cors = require('cors');
require('dotenv').config();
const mongo = require("./mongo");
const cookieSession = require("cookie-session");
const cookieParser = require("cookie-parser");

const app = express();
const PORT = process.env.PORT || 5000;

var whitelist = [
    "*",
    "http://127.0.0.1:5173",
];
var corsOptions = {
    origin: function (origin, callback) {
        // console.log(origin);
        if (whitelist.indexOf("*") !== -1) {
            callback(null, true);
        } else {
            callback("You are not allowed to access these resources");
        }
    },
    credentials: true
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/users", require("./routes/v1/user.routes"));
app.use("/api/v1/admin", require("./routes/v1/admin.routes"));

app.use(
    cookieSession({ name: "crud-operation", keys: ["refreshToken"], maxAge: 24 * 60 * 60 * 1000 })
);

app.use("/", (req, res) => {
    res.send("Server running...")
});

app.listen(PORT, () => {
    console.log(`Server running in ${PORT}`);
    mongo();
});