const mongoose = require('mongoose');

// for vendor details 
const dataSchema = new mongoose.Schema({
    name:{
        required:true,
        type:String
    },
    favoriteProducts:{
        required:true,
        type:Array
    },
})

module.exports = mongoose.model('Vendors', dataSchema)