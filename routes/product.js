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
        res.status(200).json({ "masage": "sucessfull" })
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

productRouters.get('/get_product_byid/:id', async (req, res) => {
    try {
        const productId = req.params.id;
        const data = await Model.findById(productId);
        if (!data) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(data)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
}
);
productRouters.put('/update_product/:id', async (req, res) => {
    try {
        const productId = req.params.id;
        const data = await Model.findById(productId);
        if (!data) {
            return res.status(404).json({ message: 'Product not found' });
        }
        data.product_name = req.body.product_name;
        data.sku = req.body.sku;
        data.quantity = req.body.quantity;
        data.price = req.body.price;
        data.product_discription = req.body.product_discription;
        data.thumbnail = req.body.thumbnail;
        data.product_images = req.body.product_images;
        const dataToSave = await data.save();
        res.status(200).json({ "masage": "sucessfull" })
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
}
);


productRouters.delete('/delete_products/:id', async (req, res) => {
    try {
        const productId = req.params.id;

        const deletedProduct = await Model.findByIdAndDelete(productId);

        if (!deletedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

productRouters.get('/favourite_products', async (req, res) => {
    try {
        const data = await Model.find({ favourite: true });
        res.status(200).json(data)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
});

productRouters.put('/add_favourite_products/:id/:fav', async (req, res) => {
    try {
        const productId = req.params.id;
        const fav = req.params.fav;
        const data = await Model.findById(productId);
        if (!data) {
            return res.status(404).json({ message: 'Product not found' });
        }
        data.favourite = fav;
        const dataToSave = await data.save();
        res.status(200).json({ "masage": "sucessfull" })
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
}
);

productRouters.get('/search', async (req, res) => {
    const query = req.query.q;
    // console.log(query)
    try {
      const results = await Model.find({ product_name: new RegExp(query, 'i') });
      res.json(results);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

module.exports = productRouters;