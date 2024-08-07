const express = require('express');
const Model = require('../models/vendor_details');


const vendorRouters = express.Router()
/*create a vendor for development, requirment is only for a vender, 
there for not develop authentication and authoraisation*/

vendorRouters.post('/create_vendor', async (req, res) => {
    const data = new Model({
        name: req.body.name
    })

    const vendor = await Model.find();
    if (vendor.length > 0) {
        res.status(200).json({ message: "vendor already created","uid": vendor[0]._id, "name": vendor[0].name })
    } else {

        try {
            const dataToSave = await data.save();
            res.status(200).json({ "masage": "sucessfull create temp vendor", "uid": dataToSave._id, "name": dataToSave.name })
        }
        catch (error) {
            res.status(400).json({ message: error.message })
        }
    }

});

vendorRouters.put('/add_favourite_products', async (req, res) => {
    try {
        const vendor = await Model.findById(req.body.vendor_id);
        vendor.favoriteProducts = req.body.product_ids;
        const dataToSave = await vendor.save();
        res.status(200).json({ "masage": "sucessfull" })
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
});

vendorRouters.get('/get_favourite_products', async (req, res) => {
    try {
        const vendor = await Model.findById(req.body.vendor_id);
        res.status(200).json(vendor.favoriteProducts)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
});

module.exports = vendorRouters;