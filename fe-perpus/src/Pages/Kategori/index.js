import React, { useState } from "react";
// import Cookies from "js-cookie";
import axios from "axios";
import Navbar from "../../Components/Navbar";

export default function Koleksi() {
  const [nama_kategori, setNama_kategori] = useState("");

  const handleSubmit = async () => {
    try {
      const response = await axios.post("http://localhost:4000/kategori/create", {
        nama_kategori,
      });

      if (response.status === 200) {
        alert("Kategori berhasil ditambahkan");
      } else {
        alert("Gagal menambahkan kategori");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Navbar />
      <center>
        {/* <h1 style={{ marginTop: 40 }}>Login</h1> */}
        <input
          type="text"
          placeholder="Nama Kategori"
          onChange={(e) => setNama_kategori(e.target.value)}
          value={nama_kategori}
          style={{
            width: "400px",
            height: "36px",
            borderRadius: "5px",
            border: "1px solid grey",
            backgroundColor: "#f4f4f4",
            padding: "2px 10px",
            fontSize: "14px",
            marginBottom: "10px",
            marginTop: "100px",
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
