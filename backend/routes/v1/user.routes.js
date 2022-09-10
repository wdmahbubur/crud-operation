const router = require("express").Router();

const { addUser, getUsers, getUserById, updateUserById, deleteUserById } = require("../../controllers/user.controller");

const { verifyAccessToken } = require("../../middleware/admin.middleware");

router.post("/add", verifyAccessToken, addUser);

router.get("/", getUsers);
router.get("/:id", getUserById);

router.put("/update/:id", verifyAccessToken, updateUserById);

router.delete("/delete/:id", verifyAccessToken, deleteUserById);




module.exports = router;
