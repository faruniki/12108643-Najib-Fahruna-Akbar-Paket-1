import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import Navbar from "../../Components/Navbar";

export default function Register() {
  const token = Cookies.get("token") || "";

  const [username, setJudul] = useState("");
  const [email, setPenerbit] = useState("");
  const [password, setPenulis] = useState("");
  const [role, setTahun_terbit] = useState("");
  
  const handleSubmit = async () => {
    const apiUrl = `http://localhost:4000/auth/register`;

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            username,
            email,
            role,
            password,
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

  return (
    <div>
      {/* <Navbar /> */}
      <center>
        {/* <h1 style={{ marginTop: 40 }}>Login</h1> */}
        <input
          type="text"
          placeholder="Judul"
          onChange={(e) => setJudul(e.target.value)}
          value={username}
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
          value={email}
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
          value={password}
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
          value={role}
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
