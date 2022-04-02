const router = require("express").Router();
const RankingsSchema = require("../models/Rankings");
const PlayersSchema = require("../models/Players");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const fetch = require("node-fetch")
const { getRank } = require("../utils/utils");

router.use(cors({
  credentials: true,
  origin: process.env.SERVER_CLIENT_URL
}))

router.use(cookieParser());

router.get("/leaderboard", async(req, res) => {
  RankingsSchema.find({}, null, { sort: { rank: 1 } }, (err, post) => {
    res.json(post).status(200);
  }).limit(req.headers.limit)
});

router.get("/tournaments", async(req, res) => {
  await fetch(`https://www.ultimatetennisstatistics.com/tournamentsTable?current=${req.headers.page}&rowCount=20&searchPhrase=&fromSeason=2017&toSeason=&level=${req.headers.level}&surface=&indoor=&speed=&_=1648313910758`).then(async(data) => {
    let result = await data.json();
    res.json(result).status(200);
  });
});

router.get("/tournaments/search", async(req, res) => {
  await fetch(`https://www.ultimatetennisstatistics.com/tournamentsTable?current=1&rowCount=500&searchPhrase=&fromSeason=&toSeason=&level=&surface=&indoor=&speed=&_=1648313910758`).then(async(data) => {
    let result = await data.json();
    let tournament = result.rows.filter((x) => x.name.toLowerCase().includes(req.headers.search.toLowerCase()));
    tournament = tournament.map((x) => {
      let level = [];
      if(x.levels[0] == "G") level.push("Grand Slam");
      if(x.levels[0] == "M" || x.levels[1] == "M") level.push("Masters");
      if(x.levels[0] == "A" || x.levels[1] == "A") level.push("ATP 500");
      if(x.levels[0] == "B" || x.levels[1] == "B") level.push("ATP 250");
      if(x.levels[0] == "O" || x.levels[1] == "O") level.push("Olympics");
      if(x.levels[0] == "F" || x.levels[1] == "F") level.push("Finals");
      if(x.levels[0] == "L" || x.levels[1] == "L") level.push("Finals");

      let surface = [];
      if(x.surfaces[0] == "H" || x.surfaces[1] == "H") surface.push("Hard");
      if(x.surfaces[0] == "G" || x.surfaces[1] == "G") surface.push("Grass");
      if(x.surfaces[0] == "P" || x.surfaces[1] == "P") surface.push("Carpet");
      if(x.surfaces[0] == "C" || x.surfaces[1] == "C") surface.push("Clay");
      return {
        id: x.id,
        name: x.name,
        levels: level.join(", ").trim(),
        surfaces: surface.join(", ").trim(),
        topPlayers: x.topPlayers,
        playerCount: x.playerCount,
        eventCount: x.eventCount,
      }
    });

    res.json(tournament).status(200);
  });
})

router.get("/tournament/:id", async(req, res) => {
  await fetch(`https://www.ultimatetennisstatistics.com/tournamentEventsTable?tournamentId=${req.params.id}&current=1&rowCount=15&sort%5Bdate%5D=desc&searchPhrase=`).then(async(data) => {
    let result = await data.json();
    res.json(result).status(200);
  });
});

router.get("/players/search", async(req, res) => {
  let query = req.headers.search;
  if(query == '') {
    RankingsSchema.find({ }, function (err, post) {
      res.json(post).status(200);

      return;
    })
  }
  PlayersSchema.aggregate([
    {$project: { "id": "$id", "hand": "$hand", "dob": "$dob", "country": "$country", "fullName" : { $concat : [ "$firstName", " ", "$lastName" ] } }},
    {$match: {"fullName": {$regex: query, $options:'i'}}} ]).exec(async function(err, result) {
    result = result.map(async(x) => {
      let playerRank = await getRank(`${x.id}`);
      x.rank = playerRank.rank;
      x.points = playerRank.points;
      return x;
    });

    result = await Promise.all(result);
    result = result.sort((a, b) => a.rank - b.rank)
    res.json(result).status(200)
  });
});

router.get("/players/:id", async(req, res) => {
  PlayersSchema.find({ id: parseInt(req.params.id) }, (err, post) => {
    res.json(post).status(200);
  });
});

router.get("/players", async(req, res) => {
  PlayersSchema.find({}, (err, post) => {
    res.json(post).status(200);
  });
});


/* router.get("/list", async(req, res) => {
  UserSchema.find({}, "id firstName lastName username email profilePicture", (err, post) => {
    res.json(post).status(200);
  })
});

router.get("/:id", async(req, res) => {
  let exist = await UserSchema.exists({ id: req.params.id });
  if(!exist) return res.json({
    status: 404
  }).status(404);
  let userData = await UserSchema.findOne({ id: req.params.id });
  
  res.json(userData).status(200);
});

router.put("/:id", async(req, res) => {
  UserSchema.findOneAndUpdate({ id: req.params.id }, req.body, { new: true }, async(err, post) => {
    if(err) console.log(err)
    console.log('posted')
    res.json(post).status(200);
  });
}); */

module.exports = router;