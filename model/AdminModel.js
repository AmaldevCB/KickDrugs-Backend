const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
   username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    default: "admin"
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  otp: {
    type: String
  },
  otpExpiry: {
    type: Date
  }
});

module.exports = mongoose.model('admin', adminSchema);
