const express = require('express');
const Model = require('../models/product_detail');



const productRouters = express.Router()
productRouters.post('/add_product', async (req, res) => {

    // console.log(req.body)

    const data = new Model({
        product_name: req.body.product_name,
        sku: req.body.sku,
        quantity: req.body.quantity,
        price: req.body.price,
        product_discription: req.body.product_discription,
        thumbnail: req.body.thumbnail,
        product_images: req.body.product_images

    })

    try {
        const dataToSave = await data.save();
        res.status(200).json({"masage":"sucessfull" })
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }

});

productRouters.get('/get_products', async (req, res) => {
    try {
        const data = await Model.find();
        res.status(200).json(data)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
});

module.exports = productRouters;