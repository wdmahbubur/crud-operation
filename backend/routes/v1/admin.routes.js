const router = require("express").Router();

const { createAdmin, login } = require("../../controllers/admin.controller");

router.post("/create", createAdmin);
router.post("/login", login);

module.exports = router;