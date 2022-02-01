const nodemailer = require("nodemailer");
const User = require("../models/userModel.js");

var transporter = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "2640a48852d84b",
    pass: "5d9a27e27a46a8",
  },
});

allUsers = async (req, res) => {
  //const users = await User.find({});
  res.status(200).send(req.user);
};

login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findByCredential(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (e) {
    res.status(400).send('Fail');
  }
};

logout = async (req, res) => {
  try {
  //   req.user.tokens = req.user.tokens.filter((token) => {
  //     return token.token !== req.token
  // });
  // console.log(req.user);
  await req.user.save();

  res.send();
  } catch (e) {
    res.status(500).send('Error');
  }
}

userSingup = async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({ user: user, token: token });
  } catch (e) {
    res.status(400).send(e);
  }
};

module.exports = { userSingup, login, allUsers , logout};
