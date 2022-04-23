require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const api = require("./routes/api");
const cors = require("cors");

app.use(cors({
  origin: process.env.SERVER_CLIENT_URL
}));

app.use(cookieParser());
app.use(express.json());

mongoose.connect(process.env.SERVER_MONGO_URL, {
   useNewUrlParser: true,
}).then(() => console.log(`Successfully Connected to MongoDB.`))
  .catch((err) => console.log(err));

app.use("/api", api);

app.listen(process.env.PORT || 5000, () => console.log(`Listenting on Port ${process.env.PORT || 5000}.`));