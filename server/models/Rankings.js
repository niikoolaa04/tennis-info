const mongoose = require("mongoose");

const RankingsSchema = new mongoose.Schema({
  date: {
    type: String
  },
  rank: {
    type: Number,
  },
  player: {
    type: String,
    default: 'N/A'
  },
  points: {
    type: Number,
  }
});

module.exports = mongoose.model("Rankings", RankingsSchema);