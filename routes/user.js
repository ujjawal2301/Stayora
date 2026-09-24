const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const { saveRedirecturl } = require("../middleware");
const userController = require("../controllers/users");
const passport = require("passport");

router
    .route("/signup")
    .get(userController.renderSignupForm)
    .post(wrapAsync(userController.singup));

router
    .route("/login")
    .get(userController.renderLoginForm)
    .post(saveRedirecturl, passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }), userController.login);

router.get("/logout", userController.logout);

module.exports = router;