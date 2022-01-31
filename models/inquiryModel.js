const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/node-app');
const { Schema } = mongoose;

const InquirySchema = new Schema({
  email: String, // String is shorthand for {type: String}
  type: String,
  subject: String,
  description: String
});

const InquiryModel = mongoose.model('Enquiries', InquirySchema);

module.exports = InquiryModel; // this is what you want