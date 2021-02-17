const mongoose = require('mongoose');



//Hero Schema
const heroSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name : {
        type : String
    },
    rating : {
        type : Number
    }
    

},{timestamps:true});


module.exports = mongoose.model('Hero', heroSchema);