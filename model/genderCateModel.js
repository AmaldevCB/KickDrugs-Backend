const mongoose = require('mongoose')

const genderSchema = new mongoose.Schema({
    name: {
        type: String
    },
    value: {
        type: Number
    }
})
const gender = mongoose.model('gender', genderSchema)

const catSchema = new mongoose.Schema({
    name: {
        type: String
    },
    value: {
        type: Number
    }
})
const category = mongoose.model('category', catSchema)

module.exports={gender,category}
