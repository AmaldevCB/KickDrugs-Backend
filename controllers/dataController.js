const { gender, category } = require("../model/genderCateModel");


exports.genderController = async (req,res) => {
    console.log('inside gender controller');

    try {
        const data = await gender.find();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json(error)
    }

}

exports.catController = async (req,res) => {
    console.log('inside category controller');

    try {
        const data = await category.find();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json(error)
    }

}