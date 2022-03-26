const RankingsSchema = require("../models/Rankings");

const getRank = async(playerId) => {
  let data = {};
  let userRank = await RankingsSchema.findOne({ player: playerId });

  if(userRank) {
    data.rank = userRank.rank;
    data.points = userRank.points;
  } else {
    data.rank = 9999
    data.points = 'N/A'
  }

  return data;
}

module.exports = {
  getRank,
}