require('dotenv').config();
const mongoose = require('mongoose');
const Admin = require('./model/AdminModel');

mongoose.connect(process.env.DATABASE);

const updateAdminPhone = async () => {
  try {
    const admin = await Admin.findOne({ username: 'admin@gmail.com' });

    if (!admin) {
      console.log('Admin not found');
      return;
    }

    admin.email = 'amaldevtechtube@gmail.com';
    await admin.save();

    console.log('Phone number updated for admin');
  } catch (error) {
    console.error('Error updating phone number:', error);
  } finally {
    mongoose.disconnect();
  }
};

updateAdminPhone();
