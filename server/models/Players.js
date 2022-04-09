const mongoose = require("mongoose");

const PlayersSchema = new mongoose.Schema({
  id: {
    type: Number
  },
  firstName: {
    type: String,
    default: "N/A"
  },
  lastName: {
    type: String,
    default: "N/A"
  },
  hand: {
    type: String,
    default: "N/A"
  },
  dob: {
    type: String,
    default: "N/A"
  },
  lob: {
    type: String,
    default: "N/A"
  },
  country: {
    type: String,
    default: "N/A"
  },
  countryCode: {
    type: String,
    default: "N/A"
  },
  residence: {
    type: String,
    default: "N/A"
  },
  height: {
    type: String,
    default: "N/A"
  },
  weight: {
    type: String,
    default: "N/A"
  },
  pro: {
    type: String,
    default: "N/A"
  },
  prizeMoney: {
    type: String,
    default: "$0"
  },
  image: {
    type: String,
    default: "https://st4.depositphotos.com/17828278/24401/v/600/depositphotos_244011872-stock-illustration-image-vector-symbol-missing-available.jpg"
  },
});

module.exports = mongoose.model("Players", PlayersSchema);