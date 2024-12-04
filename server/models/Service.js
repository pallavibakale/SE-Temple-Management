const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  title: { type: String, unique: true, required: true },
  serviceImage: { type: String },
  description: { type: String, required: true },
  cost: {type: String, required: true}
});

module.exports = mongoose.model('Service', serviceSchema);
