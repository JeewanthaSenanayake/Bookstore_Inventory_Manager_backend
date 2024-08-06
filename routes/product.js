const express = require('express');
const Model = require('../models/product_detail');



const productRouters = express.Router()
productRouters.post('/add_product', async (req, res) => {

    const data = new Model({
        product_name: req.body.product_name
    })

    try {
        const dataToSave = await data.save();
        res.status(200).json({"masage":"sucessfull" })
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }

});

module.exports = productRouters;