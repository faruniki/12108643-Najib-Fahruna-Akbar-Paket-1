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
    default: "dipinjam",
    enum: ["dipinjam", "dikembalikan"],
  },
  tanggal_peminjaman: {
    type: Date,
    required: true,
  },
  tanggal_pengembalian: {
    type: Date,
    required: false,
  },
});

module.exports = mongoose.model("Peminjaman", peminjamanSchema);
