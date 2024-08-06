require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

const mongoString = process.env.DATABASE_URL;
mongoose.connect(mongoString);
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


const productRouters = require('../routes/product');
const imgUploadRouters = require('../routes/img_upload');
const vendorRouters = require('../routes/vendor_detail');
app.use('/api/product', productRouters);
app.use('/api/product', imgUploadRouters);
app.use('/api/vendor', vendorRouters);

