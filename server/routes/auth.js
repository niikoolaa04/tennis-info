const router = require("express").Router();
const UserSchema = require("../models/User");
const jwt = require('jsonwebtoken');
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { mailExistance, loginValidation, tokenCheck } = require("../middlewares/authMiddleware");

router.use(cors({
  credentials: true,
  origin: process.env.SERVER_CLIENT_URL
}))

router.use(cookieParser());

router.post("/register", mailExistance, async(req, res) => {
  if(req.emailExist) {
    return res.json({
      success: false,
      message: "Email is already in use"
    });
  }
  try {
    let userId = await UserSchema.estimatedDocumentCount();
    let user = new UserSchema(req.body);
    user.id = `${parseInt(userId) + 1}`

    await user.save()

    res.json({
      success: true,
      message: "User Created Successfully"
    });
  } catch {
    return res.json({
      success: false,
      message: "An Unknown error occurred"
    });
  }
});

router.post("/login", loginValidation, (req, res) => {
  if(req.accountExist == false) {
    res.status(404).json({
      success: false,
      message: "User doesn't exist"
    })
  }
  if(req.invalidPassword == false) {
    const payload = { id: req.userId, email: req.body.email };
    const token = jwt.sign(payload, process.env.SERVER_JWT, {
      expiresIn: '1h',
    });
    res.cookie('token', token)
    res.status(200).json({ success: true, message: "Login Successful" })
  } else {
    res.status(401).json({
      success: false,
      message: "Invalid Password"
    })
  }
});

router.post("/password/check", async(req, res) => {
  let userId = req.body.id;
  let password = req.body.password;
  let exist = await UserSchema.exists({ id: userId });
  if(!exist) return res.json({
    success: false,
    status: 404,
    valid: false
  }).status(404);
  UserSchema.findOne({ id: userId }, async function(err, post) {
    let comparedPassword = await post.comparePassword(password);
    res.json({
      success: true,
      valid: comparedPassword
    })
  })
});

router.get("/check", tokenCheck, (req, res) => {
  res.status(200).json({ success: true, message: 'Working' });
})

router.get("/decode", (req, res) => {
  let cookie = req.cookies["token"];
  if(!cookie) return res.json({
    id: null,
    mail: null
  }).status(404);
  let decodeToken = jwt.verify(cookie, process.env.SERVER_JWT);

  res.json({
    id: decodeToken.id,
    mail: decodeToken.email
  }).status(200);
})


module.exports = router;