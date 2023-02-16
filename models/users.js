// Nir Chen - 303341721
// Shmuel Maor - 206828360

const mongoose = require('mongoose');

const users = new mongoose.Schema({
    id:{
        type : String,
        required : true
    },
    first_name:{
        type : String,
        required : true
    },
    last_name:{
        type : String,
        required : true
    },
    birthday:{
        type : String,
        required : true
    }
});

const model = mongoose.model("users", users);
module.exports = model;