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
  kategoriId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Kategori",
    required: false,
  },
  gambar: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model("Buku", bukuSchema);