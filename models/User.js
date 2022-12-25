const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const { Schema } = mongoose;
const bcrypt = require("bcryptjs");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = new Schema(
  { 
    name: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
    },
     tokens: [
      {
        token: {
          type: String,
          required: true,
        },
  
      },
    ],
  }
    
 
  
);
userSchema.plugin(uniqueValidator);
userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, process.env.PRIVATE_KEY,);
  user.tokens = user.tokens.concat({ token });

  await user.save();
  return token;
};
userSchema.pre("save", async function (next) {
  const user = this;

  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }

  next();
});

module.exports = mongoose.model("User", userSchema);

