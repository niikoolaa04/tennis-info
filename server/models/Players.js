const mongoose = require("mongoose");

const PlayersSchema = new mongoose.Schema({
  id: {
    type: Number
  },
  firstName: {
    type: String,
    default: 'N/A'
  },
  lastName: {
    type: String,
    default: 'N/A'
  },
  hand: {
    type: String,
    default: 'N/A'
  },
  dob: {
    type: String,
  },
  country: {
    type: String,
  }
});

module.exports = mongoose.model("Players", PlayersSchema);