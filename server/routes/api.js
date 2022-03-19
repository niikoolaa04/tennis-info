const router = require("express").Router();
const RankingsSchema = require("../models/Rankings");
const PlayersSchema = require("../models/Players");
const cookieParser = require("cookie-parser");
const cors = require("cors");

router.use(cors({
  credentials: true,
  origin: process.env.SERVER_CLIENT_URL
}))

router.use(cookieParser());

router.get("/leaderboard", async(req, res) => {
  RankingsSchema.find({}, (err, post) => {
    res.json(post).status(200);
  }).limit(req.headers.limit);
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