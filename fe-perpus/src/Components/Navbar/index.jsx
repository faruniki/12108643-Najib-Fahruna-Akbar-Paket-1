import React from "react";
import "../../Styles/navbar.css";
import LogoutIcon from "@mui/icons-material/Logout";
import Cookies from "js-cookie";

export default function Navbar() {
  const token = Cookies.get("access_token") || "";

  const LogOut = async () => {
    if (token) {
      Cookies.remove("access_token");
      alert("Anda sudah keluar");
      window.location.replace("/");
    } else {
      alert("Unauthorized");
    }
  };

  return (
    <div className="container">
      <div className="left">
        Perpustakaan <span>Express</span>
      </div>
      <div className="right">
        <li>
          <a href="/buku">Buku</a>
        </li>
        <li>
          <a href="/kategori">Kategori</a>
        </li>
        <li>
          <a href="/peminjaman">Peminjaman</a>
        </li>
        <li>
          <a href="/koleksi">Koleksi</a>
        </li>
        <li>
          <a href="/review">Review</a>
        </li>
        <li style={{marginLeft: 10, marginRight: 10}}>
          <a onClick={LogOut}>
            <LogoutIcon />
          </a>
        </li>
      </div>
    </div>
  );
}
