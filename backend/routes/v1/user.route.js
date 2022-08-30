const router = require("express").Router();

const { addUser, getUsers, getUserById, updateUserById, deleteUserById } = require("../../controllers/user.controller");

router.post("/add", addUser);

router.get("/", getUsers);
router.get("/:id", getUserById);

router.put("/:id", updateUserById);

router.delete("/:id", deleteUserById);


module.exports = router;
