const mongoose = require("mongoose");

const peminjamanSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  bukuId: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: "p",
    enum: ["p", "k"],
  },
});

module.exports = mongoose.model("Peminjaman", peminjamanSchema);
