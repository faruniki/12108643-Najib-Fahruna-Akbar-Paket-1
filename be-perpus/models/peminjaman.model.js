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
    type: String,
    required: true,
    trim: true,
  },
  tanggal_pengembalian: {
    type: String,
    required: false,
    trim: true,
  },
});

module.exports = mongoose.model("Peminjaman", peminjamanSchema);
