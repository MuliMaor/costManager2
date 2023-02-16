// Nir Chen - 303341721
// Shmuel Maor - 206828360

const mongoose = require('mongoose');

const costs = new mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },
    day: {
        type: String,
        default: new Date().getDate()
    },
    month: {
        type: String,
        default: new Date().getMonth() + 1
    },
    year: {
        type: String,
        default: new Date().getFullYear()
    },
    id: {
        type: mongoose.Types.ObjectId,
        default: mongoose.Types.ObjectId
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    sum: {
        type: Number,
        required: true
    }
});

const model = mongoose.model("costs", costs);
module.exports = model;