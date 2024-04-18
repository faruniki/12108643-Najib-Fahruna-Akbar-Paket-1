import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import Navbar from "../../Components/Navbar";
import { SettingsAccessibility } from "@mui/icons-material";

export default function AddBuku() {
  const token = Cookies.get("token") || "";

  const [dataKategori, setDataKategori] = useState([]);

  const [judul, setJudul] = useState("");
  const [penerbit, setPenerbit] = useState("");
  const [penulis, setPenulis] = useState("");
  const [tahun_terbit, setTahun_terbit] = useState("");
  const [gambar, setGambar] = useState("");
  const [kategoriId, setKategoriId] = useState("");

  const handleSubmit = async () => {
    const apiUrl = `http://localhost:4000/buku/create`;

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          judul,
          penerbit,
          penulis,
          tahun_terbit,
          gambar,
          kategoriId
        }),
      });

      if (response.status === 200) {
        alert("Data berhasil ditambah");
        window.location.replace("/buku");
      } else if (response.status === 400) {
        alert("Gagal mengubah data");
      } else {
        console.error("Gagal");
      }
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  async function fetchKategori() {
    const apiUrl = `http://localhost:4000/kategori`;

    try {
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setDataKategori(data);
      } else {
        console.error("Failed to fetch books");
      }
    } catch (error) {
      console.error("Error fetching books: ", error);
    }
  }

  useEffect(() => {
    fetchKategori();
  }, []);

  return (
    <div>
      <Navbar />
      <center>
        {/* <h1 style={{ marginTop: 40 }}>Login</h1> */}
        <input
          type="text"
          placeholder="Judul"
          onChange={(e) => setJudul(e.target.value)}
          value={judul}
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
        <input
          type="text"
          placeholder="Penerbit"
          onChange={(e) => setPenerbit(e.target.value)}
          value={penerbit}
          style={{
            width: "400px",
            height: "36px",
            borderRadius: "5px",
            border: "1px solid grey",
            backgroundColor: "#f4f4f4",
            padding: "2px 10px",
            fontSize: "14px",
            marginBottom: "10px",
          }}
        ></input>
        <br />
        <input
          type="text"
          placeholder="Penulis"
          onChange={(e) => setPenulis(e.target.value)}
          value={penulis}
          style={{
            width: "400px",
            height: "36px",
            borderRadius: "5px",
            border: "1px solid grey",
            backgroundColor: "#f4f4f4",
            padding: "2px 10px",
            fontSize: "14px",
            marginBottom: "10px",
          }}
        ></input>
        <br />
        <input
          type="text"
          placeholder="Tahun Terbit"
          onChange={(e) => setTahun_terbit(e.target.value)}
          value={tahun_terbit}
          style={{
            width: "400px",
            height: "36px",
            borderRadius: "5px",
            border: "1px solid grey",
            backgroundColor: "#f4f4f4",
            padding: "2px 10px",
            fontSize: "14px",
            marginBottom: "10px",
          }}
        ></input>
        <br />
        <input
          type="text"
          placeholder="Gambar Buku"
          onChange={(e) => setGambar(e.target.value)}
          value={gambar}
          style={{
            width: "400px",
            height: "36px",
            borderRadius: "5px",
            border: "1px solid grey",
            backgroundColor: "#f4f4f4",
            padding: "2px 10px",
            fontSize: "14px",
            marginBottom: "10px",
          }}
        ></input>
        <br />
        <select
          onChange={(e) => setKategoriId(e.target.value)}
          value={kategoriId}
          style={{
            width: "423px",
            height: "40px",
            borderRadius: "5px",
            border: "1px solid grey",
            backgroundColor: "#f4f4f4",
            padding: "2px 10px",
            fontSize: "14px",
            marginBottom: "10px",
          }}
        >
          <option value="">Pilih Kategori</option>
          {dataKategori.map((kategori) => (
            <option key={kategori._id} value={kategori._id}>
              {kategori.nama_kategori}
            </option>
          ))}
        </select>
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
