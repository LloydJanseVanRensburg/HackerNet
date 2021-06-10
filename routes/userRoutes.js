const express = require("express");
const userControllers = require("../controllers/userControllers");
const isAuth = require("../middleware/isAuth");
const router = express.Router();

router.route("/").get(isAuth, userControllers.getAllUsers);

router.route("/login").post(userControllers.loginUser);
router.route("/register").post(userControllers.registerUser);

router.get("/myfeed", userControllers.getMyFeedPage);
router.get("/myprofile", userControllers.getMyProfilePage);

module.exports = router;
