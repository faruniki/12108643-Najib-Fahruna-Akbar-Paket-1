import React from "react";
import "../../Styles/navbar.css";

export default function Navbar() {
  return (
    <div className="container">
      <div className="left">Perpustakaan <span>Express</span></div>
      <div className="right">
        <li><a href="/buku">Buku</a></li>
        <li><a href="/kategori">Kategori</a></li>
        <li><a href="/peminjaman">Peminjaman</a></li>
        <li><a href="/koleksi">Koleksi</a></li>
      </div>
    </div>
  );
}
