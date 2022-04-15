const mongoose = require("mongoose");

const PlayersSchema = new mongoose.Schema({
  id: {
    type: Number
  },
  rank: {
    type: Number,
  },
  points: {
    type: Number,
  },
  atp_date: {
    type: String,
    default: "N/A"
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
    default: "https://www.komysafety.com/images/banner/no-image.png"
  },
});

module.exports = mongoose.model("Players", PlayersSchema);