const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    trim: true,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    trim: true,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    trim: true,
    required: true,
  },
  role: {
    type: String,
    default: "u",
    enum: ["a", "p", 'u'],
  },
  address: {
    type: String,
    trim: true,
    required: false,
  },
});

userSchema.statics.findByCredentials = async function (username, password) {
  const user = await this.findOne({ username });
  if (!user) throw new Error("invalid credentials");
  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) throw new Error("invalid credentials");
  return user;
};

userSchema.pre("save", async function (next) {
  if (this.isModified("password"))
    this.password = await bcrypt.hash(this.password, 8)
  next();
});

module.exports = mongoose.model("User", userSchema);