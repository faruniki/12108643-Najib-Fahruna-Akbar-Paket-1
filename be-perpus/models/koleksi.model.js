const mongoose = require("mongoose");

const koleksiSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  bukuId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Buku",
    required: true,
  },
});

module.exports = mongoose.model("Koleksi", koleksiSchema);