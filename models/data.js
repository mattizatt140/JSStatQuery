const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const datasetSchema = new Schema({
    name: String,
    values: []
});

module.exports = mongoose.model('Dataset', datasetSchema);
