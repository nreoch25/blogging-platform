const express = require("express");
const router = express.Router();
const {
  signup,
  signin,
  signout,
  me,
  requireSignin,
  authMiddleware
} = require("../controllers/auth");
// validators
const { runValidation } = require("../validators");
const {
  userSignupValidator,
  userSigninValidator
} = require("../validators/auth");

router.post("/signup", userSignupValidator, runValidation, signup);
router.post("/signin", userSigninValidator, runValidation, signin);
router.get("/signout", signout);
router.get("/profile", requireSignin, authMiddleware, me);

module.exports = router;
