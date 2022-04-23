const router = require("express").Router();
const PlayersSchema = require("../models/Players");
const fetch = require("node-fetch");

router.get("/leaderboard", async(req, res) => {
  if(req.headers.origin != process.env.SERVER_CLIENT_URL) return res.sendStatus(401);
  PlayersSchema.find({ }, null, { sort: { rank: 1 } }, (err, post) => {
    res.json(post).status(200);
  }).limit(req.headers.limit)
});

router.get("/tournaments", async(req, res) => {
  if(req.headers.origin != process.env.SERVER_CLIENT_URL) return res.sendStatus(401);
  await fetch(`https://www.ultimatetennisstatistics.com/tournamentsTable?current=${req.headers.page}&rowCount=20&searchPhrase=&fromSeason=2017&toSeason=&level=${req.headers.level}&surface=${req.headers.surface}&indoor=&speed=&_=1648313910758`).then(async(data) => {
    let result = await data.json();
    res.json(result).status(200);
  });
});

router.get("/tournaments/search", async(req, res) => {
  if(req.headers.origin != process.env.SERVER_CLIENT_URL) return res.sendStatus(401);
  await fetch(`https://www.ultimatetennisstatistics.com/tournamentsTable?current=1&rowCount=500&searchPhrase=&fromSeason=&toSeason=&level=&surface=&indoor=&speed=&_=1648313910758`).then(async(data) => {
    let result = await data.json();
    let tournament = result.rows.filter((x) => x.name.toLowerCase().includes(req.headers.search.toLowerCase()));
    tournament = tournament.map((x) => {
      let level = [];
      if(x.levels[0] == "G") level.push("Grand Slam");
      if(x.levels[0] == "M" || x.levels[1] == "M") level.push("Masters (ATP 1000)");
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

router.get("/tournament/latest", async(req, res) => {
  if(req.headers.origin != process.env.SERVER_CLIENT_URL) return res.sendStatus(401);
  await fetch(`https://www.ultimatetennisstatistics.com/inProgressEventsTable?current=1&rowCount=-1&searchPhrase=&_=1650103550630`).then(async(data) => {
    let result = await data.json();
    res.json(result).status(200);
  });
})

router.get("/tournament/:id", async(req, res) => {
  if(req.headers.origin != process.env.SERVER_CLIENT_URL) return res.sendStatus(401);
  await fetch(`https://www.ultimatetennisstatistics.com/tournamentEventsTable?tournamentId=${req.params.id}&current=1&rowCount=15&sort%5Bdate%5D=desc&searchPhrase=`).then(async(data) => {
    let result = await data.json();
    res.json(result).status(200);
  });
});

router.get("/players/search", async(req, res) => {
  if(req.headers.origin != process.env.SERVER_CLIENT_URL) return res.sendStatus(401);
  let query = req.headers.search;
  if(query == '') {
    PlayersSchema.find({ }, function (err, post) {
      res.json(post).status(200);

      return;
    })
  }
  PlayersSchema.aggregate([
    {$project: { "id": "$id", "hand": "$hand", "rank": "$rank", "points": "$points", "dob": "$dob", "country": "$country", "fullName" : { $concat : [ "$firstName", " ", "$lastName" ] } }},
    {$match: {"fullName": {$regex: query, $options:'i'}}} ]).exec(async function(err, result) {

    result = await Promise.all(result);
    result = result.sort((a, b) => a.rank - b.rank)
    res.json(result).status(200)
  });
});

router.get("/players/goat", async(req, res) => {
  if(req.headers.origin != process.env.SERVER_CLIENT_URL) return res.sendStatus(401);
  await fetch(`https://www.ultimatetennisstatistics.com/goatListTable?current=1&rowCount=3&sort%5BtotalPoints%5D=desc&searchPhrase=&oldLegends=true`).then(async(data) => {
    let result = await data.json();
    res.json(result).status(200);
  });
})

router.get("/players/:id", async(req, res) => {
  if(req.headers.origin != process.env.SERVER_CLIENT_URL) return res.sendStatus(401);
  PlayersSchema.find({ id: parseInt(req.params.id) }, (err, post) => {
    res.json(post).status(200);
  });
});

router.get("/players", async(req, res) => {
  if(req.headers.origin != process.env.SERVER_CLIENT_URL) return res.sendStatus(401);
  PlayersSchema.find({}, (err, post) => {
    res.json(post).status(200);
  });
});

module.exports = router;