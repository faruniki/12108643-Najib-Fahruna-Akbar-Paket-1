const mongoose = require("mongoose");

const bukuSchema = new mongoose.Schema({
  judul: {
    type: String,
    required: true,
  },
  penulis: {
    type: String,
    required: true,
  },
  penerbit: {
    type: String,
    required: true,
  },
  tahun_terbit: {
    type: Number,
    required: true,
  },
  kategori: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model("Buku", bukuSchema);