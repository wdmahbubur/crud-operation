const router = require("express").Router();

const { createAdmin, login, generateAccessToken } = require("../../controllers/admin.controller");
const { verifyRefreshToken } = require("../../middleware/admin.middleware");

router.post("/create", createAdmin);
router.post("/login", login);

router.get("/access-token", verifyRefreshToken, generateAccessToken);


module.exports = router;