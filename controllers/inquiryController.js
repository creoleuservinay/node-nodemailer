const nodemailer = require("nodemailer");
const Enquiry = require("../models/inquiryModel");

var transporter = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "2640a48852d84b",
    pass: "5d9a27e27a46a8"
  }
});

newInquiry = async (req, res) => {
  //Store enquiry into database.
  const { email, subject, description, type } = req.body;
  const createNewenquiry = await Enquiry.create({
    email: email,
    type: type,
    subject: subject,
    description: description,
  });
  //Send email notification to user.
  const mailData = {
    from: "vinay.kaithwas@creolestudios.com",
    to: [email],
    subject: "Inquiry received",
    html: `<p>We have received your request with following detail<br><p>Email: ${email}</p><p>Subject: ${subject}</p><p>Type: ${type}</p>Description: ${description}</p>`,
    attachments: [
      {
        filename: "text note.txt",
        path: "note.txt",
      },
    ],
  };

  transporter.sendMail(mailData, function (err, info) {
    if (err) {
      res.status(500).send(err);
    } else {
      res
        .status(200)
        .send({
          message: "Email successfully sent to recipient!",
          messageId: info.messageId,
          data:createNewenquiry
        });
    }
  });
};

module.exports = { newInquiry };
