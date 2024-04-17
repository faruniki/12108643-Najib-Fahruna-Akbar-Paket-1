import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import Navbar from "../../Components/Navbar";

export default function AddPeminjaman() {
  const token = Cookies.get("access_token") || "";

  const [userId, setUserId] = useState("");
  const [bukuId, setBukuId] = useState("");
  
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
          }),
      });

      if (response.status === 200) {
        alert("Data berhasil ditambah");
      } else if (response.status === 400) {
        alert("Gagal menambahkan data");
      } else {
        console.error("Failed to submit data");
      }
    } catch (error) {
      console.error("Error during data submission", error);
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
        setUserId(data._id);
        console.log(userId)
      } else if (response.status === 404) {
        setUserId([]);
      }
    } catch (error) {
      setUserId(false);
    }
  }

  useEffect(() => {
    profile();
  }, []);

  return (
    <div>
      <Navbar />
      <center>
        {/* <h1 style={{ marginTop: 40 }}>Login</h1> */}
        <input
          type="text"
          placeholder="Judul Buku"
          onChange={(e) => setBukuId(e.target.value)}
          value={bukuId}
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
