const mongoose = require('mongoose');

// Define the Crystal schema
const crystalSchema = new mongoose.Schema({
    name: { type: String, required: true },
    hardness: { type: Number, required: true },
    color: { type: String, required: true }
});

// Export the Crystal model
module.exports = mongoose.model('Crystal', crystalSchema);
