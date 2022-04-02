require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser")
const auth = require("./routes/auth");
const users = require("./routes/users");
const api = require("./routes/api");

/* const results = [], rankings = [];

fs.createReadStream('atp_rankings_current.csv')
  .pipe(csv())
  .on('data', (data) => {
    rankings.push({
      date: data.ranking_date,
      rank: data.rank,
      player: data.player,
      points: data.points,
    });
  })
  .on('end', async() => {
    await RankingsSchema.insertMany(rankings, function(error, docs) {
      console.log('done')
    });
  }); */

app.use(cookieParser());
app.use(express.json());
app.use(cors({
  credentials: true,
  origin: process.env.SERVER_CLIENT_URL
}));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Origin", process.env.SERVER_CLIENT_URL);
  next();
})

mongoose.connect(process.env.SERVER_MONGO_URL, {
  useNewUrlParser: true,
}).then(() => console.log(`Successfully Connected to MongoDB.`))
  .catch((err) => console.log(err));

app.use("/auth", auth);
app.use("/api", api);
app.use("/users", users);

app.listen(process.env.SERVER_PORT, () => console.log(`Listenting on Port ${process.env.SERVER_PORT}.`));