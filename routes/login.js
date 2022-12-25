const User = require("../models/User");
const bcrypt = require("bcryptjs");
const Router = require("express").Router();
const auth = require("../middlewares/auth");
Router.post("/login", auth, async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const user = await User.findOne({ email });
    let match = await bcrypt.compare(password.toString(), user.password);
    const confirm = user.email === email;

    if (match === true && confirm === true) {
      res.send(user.tokens);
    } else {
      res.send("Incorrect email or password");
    }
  } catch (error) {
    res.status(400).send("User is not Found");
  }
});
module.exports = Router;
