const express = require("express");
const router = express.Router();
const User = require("../model/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { registerValidation, loginValidation } = require("../validation");

//Registration
router.post("/register", async (req, res) => {
  //Data validation
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //Check if the user already exists
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).send("Email already exists");

  //Hash password
  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(req.body.password, salt, async function(err, hash) {
      const user = new User({
        email: req.body.email,
        password: hash
      });

      try {
        const savedUser = await user.save();
        res.send(savedUser);
      } catch (err) {
        res.sendStatus(400).send(err);
      }
    });
  });
});

router.post("/login", async (req, res) => {
  //Data validation
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //Check if email exists
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Email doesn't exist.");

  //Password check
  bcrypt.compare(req.body.password, user.password, function(err, passRes) {
    if (passRes) {
      const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
      return res
        .status(200)
        .header("auth-token", token)
        .send(token);
    } else {
      return res.status(400).send("Password is invalid");
    }
  });
  //Create and assign a token
  /*  */
});
module.exports = router;
