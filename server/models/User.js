const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
  id: {
    type: String
  },
  firstName: {
    type: String,
    default: 'N/A'
  },
  lastName: {
    type: String,
    default: 'N/A'
  },
  username: {
    type: String,
    default: 'N/A'
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: "No Description."
  },
  phone: {
    type: String,
    default: "+381 123 456"
  },
  profilePicture: {
    type: String,
    default: "https://cdn.dribbble.com/users/6142/screenshots/5679189/media/1b96ad1f07feee81fa83c877a1e350ce.png?compress=1&resize=400x300"
  },
  role: {
    type: Number,
    default: 0
  }
});

UserSchema.pre('findOneAndUpdate', async function (next) {
  const docToUpdate = await this.model.findOne(this.getQuery());
  if(!docToUpdate) {
    next();
  }

  if(docToUpdate.password !== this._update.password && this._update.password != '' && this._update.password) {
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(this._update.password, salt)
    this._update.password = hashedPassword
    next();
  } else if(!this._update.password) {
    next();
  } else {
    next();
  }
})
   
UserSchema.methods.comparePassword = function(candidatePassword, cb) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model("User", UserSchema);