import React, { useEffect, useState } from "react";
import "../../Styles/navbar.css";
import LogoutIcon from "@mui/icons-material/Logout";
import Cookies from "js-cookie";

export default function Navbar() {
  const token = Cookies.get("access_token") || "";
  const [role, setRole] = useState("");

  const LogOut = async () => {
    if (token) {
      Cookies.remove("access_token");
      alert("Anda sudah keluar");
      window.location.replace("/");
    } else {
      alert("Unauthorized");
    }
  };

  async function profile() {
    const apiUrl = `http://localhost:4000/auth/profile`;

    try {
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        const data = await response.json();
        setRole(data.role);
      } else if (response.status === 404) {
        setRole("");
      }
    } catch (error) {
      setRole("");
    }
  }

  useEffect(() => {
    profile();
  }, []);

  return (
    <div className="container">
      <div className="left">
        Perpustakaan <span>Express</span>
      </div>
      <div className="right">
        <li>
          <a href="/buku">Buku</a>
        </li>
        {(role === "p" || role === "a") && (
          <li>
            <a href="/kategori">Kategori</a>
          </li>
        )}
        <li>
          <a href="/peminjaman">Peminjaman</a>
        </li>
        {role === "u" && (
          <li>
            <a href="/koleksi">Koleksi</a>
          </li>
        )}
        <li>
          <a href="/review">Review</a>
        </li>
        {role === "a" && (
          <li>
            <a href="/users">Users</a>
          </li>
        )}
        {(role === "a" || role === "p" || role === "u") && (
          <li style={{ marginLeft: 10, marginRight: 10 }}>
            <a onClick={LogOut}>
              <LogoutIcon />
            </a>
          </li>
        )}
      </div>
    </div>
  );
}
