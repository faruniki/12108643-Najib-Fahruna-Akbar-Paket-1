import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import Navbar from "../../Components/Navbar";
import { Button, Modal, TextField } from "@mui/material";


export default function AddPeminjaman() {
  const token = Cookies.get("access_token") || "";

  const [dataBuku, setDataBuku] = useState([]);
  const [dataUsers, setDataUsers] = useState([]);

  const [userId, setUserId] = useState("");
  const [bukuId, setBukuId] = useState("");
  const [tanggal_peminjaman, setTanggal_peminjaman] = useState("");

  const handleSubmit = async () => {
    const apiUrl = `http://localhost:4000/peminjaman/create`;

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          userId,
          bukuId,
          tanggal_peminjaman,
        }),
      });

      if (response.status === 200) {
        alert("Data berhasil ditambah");
        window.location.replace("/peminjaman");
      } else if (response.status === 400) {
        alert("Gagal mengubah data");
      } else {
        console.error("Gagal");
      }
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  async function fetchUsers() {
    const apiUrl = `http://localhost:4000/auth`;

    try {
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setDataUsers(data);
      } else {
        console.error("Failed to fetch users");
      }
    } catch (error) {
      console.error("Error fetching users: ", error);
    }
  }

  async function fetchBuku() {
    const apiUrl = `http://localhost:4000/buku`;

    try {
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setDataBuku(data);
      } else {
        console.error("Failed to fetch books");
      }
    } catch (error) {
      console.error("Error fetching books: ", error);
    }
  }

  useEffect(() => {
    fetchUsers();
    fetchBuku();
  }, []);

  const [ role, setRole ] = useState("");

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
        setUserId(data._id);
      } else if (response.status === 404) {
      }
    } catch (error) {}
  }

  
  useEffect(() => {
    profile();
  }, []);

  return (
    <div>
      <Navbar />
      <center>
        <br />
        <select
          onChange={(e) => setBukuId(e.target.value)}
          value={bukuId}
          style={{
            width: "420px",
            height: "36px",
            borderRadius: "5px",
            border: "1px solid grey",
            backgroundColor: "#f4f4f4",
            padding: "2px 10px",
            fontSize: "14px",
            marginBottom: "10px",
            marginTop: "100px",
          }}
        >
          <option value="">Pilih Buku</option>
          {dataBuku.map((buku) => (
            <option key={buku._id} value={buku._id}>
              {buku.judul}
            </option>
          ))}
        </select>
        <br />
        <input
          type="date"
          placeholder="Tanggal Peminjaman"
          onChange={(e) => setTanggal_peminjaman(e.target.value)}
          value={tanggal_peminjaman}
          style={{
            width: "400px",
            height: "36px",
            borderRadius: "5px",
            border: "1px solid grey",
            backgroundColor: "#f4f4f4",
            padding: "2px 10px",
            fontSize: "14px",
            marginBottom: "10px",
            marginTop: "10px",
          }}
        ></input>
        <br />
        <button
          type="submit"
          onClick={handleSubmit}
          style={{
            width: "420px",
            height: "36px",
            borderRadius: "100px",
            border: "1px solid grey",
            backgroundColor: "#1944a1",
            padding: "2px 10px",
            fontSize: "14px",
            marginTop: "30px",
            color: "#fff",
            fontWeight: 600,
            letterSpacing: 1,
          }}
        >
          Tambah
        </button>
      </center>
    </div>
  );
}
