require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Admin = require('./model/AdminModel');
const { gender, category } = require('./model/genderCateModel');

mongoose.connect(process.env.DATABASE);

// const createAdmin = async () => {
//   const hashedPassword = await bcrypt.hash('admin123', 10);
//   const admin = new Admin({
//     username: 'admin@gmail.com',
//     password: hashedPassword,
//   });
//   await admin.save();
//   console.log('Admin created');
// };

// createAdmin();

const seedData = async() => {
  const genderArray = await gender.insertMany([
    { name: 'Men', value: 19512 },
    { name: 'Women', value: 10452 },
    { name: 'Other', value: 165 },
  ])
  const categoryArray = await category.insertMany([
    { name: 'Cat 01', value: 18657 },
    { name: 'Cat 02', value: 9853 },
    { name: 'Cat 03', value: 812 },
  ]);
  console.log(genderArray,categoryArray);
  
}

seedData()
