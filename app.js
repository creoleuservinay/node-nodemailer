const express = require("express");
var cors = require('cors');
const nodemailer = require("nodemailer");
const app = express();
app.set("view engine", "ejs");
app.use(express.urlencoded( { extended: false } ));
app.set('views', __dirname + '/views');
const port = process.env.PORT || 3000;
require('dotenv').config();

app.use(cors())
app.use(express.json());
const inquiryRouter = require('./routes/inquiryRoutes');
const userRouter = require('./routes/userRoutes');

app.get('/', (req, res) => {
  res.render('contactus');
});

app.use('/api/v1', inquiryRouter);
app.use('/api/v1/users', userRouter);

//App started
app.listen(port || 3000, function () {
  console.log("Server created");
});

module.exports = app;