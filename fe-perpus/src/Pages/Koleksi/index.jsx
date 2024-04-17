import React, { useState } from "react";
// import Cookies from "js-cookie";
import axios from "axios";
import Navbar from "../../Components/Navbar";

export default function Koleksi() {
  const [userId, setUserId] = useState("");
  const [setBookId, setBookId] = useState("");

  const handleSubmit = async () => {
    try {
      const response = await axios.post("http://localhost:4000/koleksi/create", {
        userId,
        bookId,
      });

      if (response.status === 200) {
        alert("Buku berhasil ditambahkan");
      } else {
        alert("Gagal menambahkan buku");
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
          placeholder="User ID"
          onChange={(e) => setUserId(e.target.value)}
          value={userId}
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
          placeholder="Book ID"
          onChange={(e) => setBookId(e.target.value)}
          value={bookId}
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
