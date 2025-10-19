const { singnup, login } = require("../controllers/authController");
const { signupValidation, loginValidation } = require("../middlewares/authvalidation");

const router = require("express").Router();


router.post("/signup",signupValidation,singnup, (req, res) => {
    res.send("Register sucessful");
});
router.post("/login",loginValidation,login, (req, res) => {
    res.send("Register sucessful");
});


module.exports = router;
