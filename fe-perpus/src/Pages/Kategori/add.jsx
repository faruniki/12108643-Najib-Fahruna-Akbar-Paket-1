import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import Navbar from "../../Components/Navbar";

export default function AddKategori() {
  const token = Cookies.get("token") || "";

  const [nama_kategori, setNama_kategori] = useState("");

  const handleSubmit = async () => {
    const apiUrl = `http://localhost:4000/kategori/create`;

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            nama_kategori
          }),
      });

      if (response.status === 200) {
        alert("Data berhasil ditambah");
        window.location.replace("/kategori");
    } else if (response.status === 400) {
        alert("Gagal mengubah data");
      } else {
        console.error("Gagal");
      }
    } catch (error) {
      console.error("Error: ", error);
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
