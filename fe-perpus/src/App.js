import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cookies from "js-cookie";

import Login from "./Pages/Auth";
import Register from "./Pages/Auth/register";

import Users from "./Pages/Users";

import Buku from "./Pages/Buku";
import AddBuku from "./Pages/Buku/add";
import UpdateBuku from "./Pages/Buku/update";

import Koleksi from "./Pages/Koleksi";
import AddKoleksi from "./Pages/Koleksi/add";
import UpdateKoleksi from "./Pages/Koleksi/update";

import Kategori from "./Pages/Kategori";
import AddKategori from "./Pages/Kategori/add";

import Review from "./Pages/Review";
import AddReview from "./Pages/Review/add";

import Peminjaman from "./Pages/Peminjaman";
import AddPeminjaman from "./Pages/Peminjaman/add";

function App() {
  const token = Cookies.get("access_token") || "";

  const [userRole, setUserRole] = useState("");
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
        setUserRole(data.role);
      } else if (response.status === 404) {
        setUserRole([]);
      }
    } catch (error) {
      setUserRole(false);
    }
  }

  useEffect(() => {
    profile();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" Component={Login} />
        if (userRole === "a") {
          <Route path="/register" Component={Register} />
        }{" "}
        else {null}
        <Route path="/users" Component={Users} />
        <Route path="/buku" Component={Buku} />
        <Route path="/buku/create" Component={AddBuku} />
        <Route path="/buku/update" Component={UpdateBuku} />
        <Route path="/koleksi" Component={Koleksi} />
        <Route path="/koleksi/create" Component={AddKoleksi} />
        <Route path="/koleksi/update" Component={UpdateKoleksi} />
        <Route path="/kategori" Component={Kategori} />
        <Route path="/kategori/create" Component={AddKategori} />
        <Route path="/review" Component={Review} />
        <Route path="/review/create" Component={AddReview} />
        <Route path="/peminjaman" Component={Peminjaman} />
        <Route path="/peminjaman/create" Component={AddPeminjaman} />
      </Routes>
    </Router>
  );
}

export default App;
