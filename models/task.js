// Import mongoose
const mongoose = require('mongoose');

// Define schema
const schemaDefinition = {
    taskName: {
        type: String,
        required: true
    },
    dueDate: {
        type: Date,
        required: true,
    },
    category: {
        type: String,
    },
    priority: {
        type: String,
    }
}

// Create schema object
let schemaObj = new mongoose.Schema(schemaDefinition);

// Create model and export
module.exports = mongoose.model('Task', schemaObj);