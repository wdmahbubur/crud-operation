const router = require("express").Router();

const { addUser, getUsers, getUserById, updateUserById, deleteUserById } = require("../../controllers/user.controller");

const { verifyAccessToken } = require("../../middleware/admin.middleware");

router.post("/add", verifyAccessToken, addUser);

router.get("/", getUsers);
router.get("/:id", getUserById);

router.put("/update/:id", updateUserById);

router.delete("/delete/:id", deleteUserById);




module.exports = router;
