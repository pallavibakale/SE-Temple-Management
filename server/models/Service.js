const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  title: { type: String, unique: true, required: true },
  serviceImage: { type: String, required: true },
  alt: { type: String, required: true },
  description: { type: String, required: true },
  category: {type: String, required: true}
});

module.exports = mongoose.model('Service', serviceSchema);
