const mongoose = require('mongoose');

// Define the Crystal schema with validation
const crystalSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Crystal name is required']
    },
    hardness: {
        type: Number,
        required: [true, 'Hardness is required'],
        min: [1, 'Hardness must be at least 1'],
        max: [10, 'Hardness must be at most 10']
    },
    color: {
        type: String,
        required: [true, 'Color is required']
    }
});

// Export the Crystal model
module.exports = mongoose.model('Crystal', crystalSchema);
