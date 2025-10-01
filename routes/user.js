const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware");
const {
  signup,
  renderSignupForm,
  login,
  logout,
} = require("../controllers/user");

router.get("/signup", renderSignupForm);

router.post("/signup", wrapAsync(signup));

router.get("/login", (req, res) => {
  res.render("users/login.ejs");
});

router.post(
  "/login",
  saveRedirectUrl,
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  login
);

router.get("/logout", logout);

module.exports = router;
