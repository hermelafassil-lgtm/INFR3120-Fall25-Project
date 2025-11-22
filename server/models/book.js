let mongoose = require("mongoose");

// Create a model

let bookModel = mongoose.Schema(
    {
    name: String,
    author: String,
    published: Number,
    description: String,
    price:Number
    },
    {   // Collection name
        collection:"books"
    }
);
// Exports module to book Model
module.exports=mongoose.model('Book',bookModel);