const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/node-app");
const { Schema } = mongoose;
var validator = require("validator");
const { isEmail } = require("validator/lib/isEmail");
var bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

const UserSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Email is invalid");
        }
      },
    },
    password: {
      type: String,
      trim: true,
    },
    name: {
      type: String,
      trim: true,
    },

    tokens: [{
      token: {
        type: String,
        required: true
      }
    }]
  },
  { timestamps: { createdAt: "created_at" } }
);



UserSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, 'thisismynewsecret');
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
}

UserSchema.statics.findByCredential = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Unable to login");
  }
  const isMatch = await bcrypt.compare(password.toString(), user.password);
  if (!isMatch) {
    throw new Error("Invalid credential");
  }
  return user;
};

//
UserSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
  }
  next();
});

const User = mongoose.model("User", UserSchema);

module.exports = User; // this is what you want
