const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/node-app');
const { Schema } = mongoose;
var validator = require('validator');
const { default: isEmail } = require('validator/lib/isEmail');

const InquirySchema = new Schema({
  email: {
    type: String,
    required: true,
    trim:true,
    validate(value){
      if(!validator.isEmail(value)) {
        throw new Error('Email is invalid');
      }
    }
  },
  type: String,
  subject: {
    type: String,
    trim: true
  },
  description: {
    type: String,
    trim: true,
  }
}, { timestamps: { createdAt: 'created_at' } });

const InquiryModel = mongoose.model('Enquiries', InquirySchema);

module.exports = InquiryModel; // this is what you want