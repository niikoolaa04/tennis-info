const router = require("express").Router();
const UserSchema = require("../models/User");
const jwt = require('jsonwebtoken');
const cookieParser = require("cookie-parser");
const cors = require("cors");

router.use(cors({
  credentials: true,
  origin: process.env.SERVER_CLIENT_URL
}))

router.use(cookieParser());

router.delete("/:id", async(req, res) => {
  UserSchema.findOneAndDelete({ id: req.params.id }, (err, post) => {
    res.json(post).status(200);
  })
});

router.get("/list", async(req, res) => {
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
});

module.exports = router;