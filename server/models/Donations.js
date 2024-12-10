const mongoose = require("mongoose");

const DonationsSchema = new mongoose.Schema({
  address: String,
  city: String,
  state: String,
  zip: String,
  cardName: String,
  email: { type: String },
  fullName: String,
  amount: String,
});

module.exports = mongoose.model("Donations", DonationsSchema);
