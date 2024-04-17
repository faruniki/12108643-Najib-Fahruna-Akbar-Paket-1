import React from "react";
import "../../Styles/navbar.css";

export default function Logbar() {

  return (
    <div className="container">
      <div className="left">Perpustakaan <span>Express</span></div>
      <div className="right">
        <li>Buku</li>
        <li>Kategori</li>
        <li>Peminjaman</li>
        <li>Koleksi</li>
        <li>Review</li>
      </div>
    </div>
  );
}
