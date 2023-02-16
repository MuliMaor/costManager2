// Nir Chen - 303341721
// Shmuel Maor - 206828360

const mongoose = require('mongoose');

const reports = new mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },
    month: {
        type: Number,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    sortedReports: {
        type: JSON,
        default: {
            food: [],
            health: [],
            housing: [],
            sport: [],
            education: [],
            transportation: [],
            other: []
        }
    }
});

    const model = mongoose.model("reports", reports);
    module.exports = model;