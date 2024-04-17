const mongoose = require("mongoose");

const koleksiSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  bukuId: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Koleksi", koleksiSchema);