//we need mongoose 
const mongoose = require("mongoose");
//create Schema 
const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,

    },
    original_price: {
        type: Number,
        required: true,
    },
    sale_price: {
        type: Number,
        required: true,
    },
    brief_description: {
        type: String,
        required: true,
    },
    images: {
        type: [String],
       
    },
    cover_image: {
        type: String,
        
    },
    shipping_charge: {
        type: Number,
        required: true,
    },
    stock: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    features: {

        type: [{
            feature: {
                type: String,
                required: true,
            },
            desc: {
                type: String,
                required: true,
            },
            feature_image: {
                type: [String],
                required: true,
            }
        }],
        required: true,

    },
    average_rating: {
        type: Number,
        required: true,
    },
    colors: {
        type: [String],
        required: true,
    },
    sizes: {
        type: [{
            size: {
                type: String,
                required: true,
            },
            stock: {
                type: Number,
                required: true,
            },
        }],
        required: true,
    },
    category: {
        type: String,
        required: true,
    },

}, { timestamps: true })

//create model of this schema 
const Product = mongoose.model("Product", ProductSchema);
//export this model
module.exports = Product;