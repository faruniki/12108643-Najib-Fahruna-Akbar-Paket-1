import React from "react";
import "../../Styles/navbar.css";

export default function Logbar() {
  return (
    <div className="container">
      <div className="left">Perpustakaan <span>Express</span></div>
      <div className="right">
        <li>List Buku</li>
        <li>Peminjaman</li>
        <li>Koleksi</li>
      </div>
    </div>
  );
}
