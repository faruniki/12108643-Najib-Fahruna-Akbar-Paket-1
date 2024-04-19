import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import Navbar from "../../Components/Navbar";

export default function AddReview() {
  const token = Cookies.get("access_token") || "";

  const [dataBuku, setDataBuku] = useState([]);

  const [userId, setUserId] = useState("");
  const [bukuId, setBukuId] = useState("");
  const [review, setReview] = useState("");
  const [rating, setRating] = useState("");

  const handleSubmit = async () => {
    const apiUrl = `http://localhost:4000/review/create`;

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
          review,
          rating,
        }),
      });

      if (response.status === 204) {
        alert("Data berhasil ditambah");
        window.location.replace("/review");
      } else if (response.status === 200) {
        alert("Data berhasil ditambah");
        window.location.replace("/review");
      } else if (response.status === 400) {
        alert("Data berhasil ditambah");
        window.location.replace("/review");
      } else {
        console.error("Gagal");
      }
    } catch (error) {
      console.error("Error: ", error);
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
        console.log(userId);
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

  async function fetchBuku() {
    const apiUrl = `http://localhost:4000/peminjaman`;

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
    fetchBuku();
  }, []);

  return (
    <div>
      <Navbar />
      <center>
        {/* <h1 style={{ marginTop: 40 }}>Login</h1> */}
        <select
          onChange={(e) => setBukuId(e.target.value)}
          value={bukuId}
          style={{
            width: "422px",
            height: "40px",
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
          {dataBuku
            .filter(
              (buku, index, self) =>
                index ===
                self.findIndex((t) => t.bukuId._id === buku.bukuId._id)
            )
            .map((buku) => (
              <option key={buku.bukuId._id} value={buku.bukuId._id}>
                {buku.bukuId.judul}
              </option>
            ))}
        </select>
        <br />
        <input
          type="text"
          placeholder="Review"
          onChange={(e) => setReview(e.target.value)}
          value={review}
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
          type="number"
          placeholder="Rating"
          onChange={(e) => {
            const value = e.target.value.trim();
            if (value === "" || (!isNaN(value) && value >= 1 && value <= 10)) {
              setRating(value);
            }
          }}
          value={rating}
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
        />

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
