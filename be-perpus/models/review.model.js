const mongoose = require("mongoose");

const bukuSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  bukuId: {
    type: String,
    required: true,
  },
  review: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Review", bukuSchema);