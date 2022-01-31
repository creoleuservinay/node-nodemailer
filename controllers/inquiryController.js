const nodemailer = require("nodemailer");
const Enquiry = require("../models/inquiryModel");

const transporter = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "57c3db20b38720",
    pass: "9bb70f80e470e9",
  },
});

newInquiry = (req, res) => {
  //Store enquiry into database.
  const { email, subject, description, type } = req.body;
  const createNewenquiry = Enquiry.create({
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
      res.status(500).send("Something went wrong.");
    } else {
      res
        .status(200)
        .send({
          message: "Email successfully sent to recipient!",
          messageId: info.messageId,
        });
    }
  });
};

module.exports = { newInquiry };
