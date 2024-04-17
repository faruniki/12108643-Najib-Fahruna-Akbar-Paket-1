const mongoose = require("mongoose");

const peminjamanSchema = new mongoose.Schema({
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
  status: {
    type: String,
    default: "p",
    enum: ["p", "k"],
  },
});

module.exports = mongoose.model("Peminjaman", peminjamanSchema);
