const router = require("express").Router();

const { addUser } = require("../../controllers/user.controller");

router.post("/add", addUser);

module.exports = router;
