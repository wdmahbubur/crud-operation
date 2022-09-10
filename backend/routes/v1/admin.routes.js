const router = require("express").Router();

const { createAdmin, login, getLoggedAdmin, generateAccessToken, logout } = require("../../controllers/admin.controller");
const { verifyRefreshToken } = require("../../middleware/admin.middleware");

router.post("/create", createAdmin);
router.post("/login", login);

router.get("/logged-admin", verifyRefreshToken, getLoggedAdmin);

router.get("/access-token", verifyRefreshToken, generateAccessToken);

router.get("/logout", logout);

module.exports = router;