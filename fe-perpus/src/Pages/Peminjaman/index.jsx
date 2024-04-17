import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import Navbar from "../../Components/Navbar";
import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";

export default function Peminjaman() {
  const token = Cookies.get("access_token") || "";
  const [dataPeminjaman, setDataPeminjaman] = useState("");

  async function fetchData() {
    const apiUrl = `http://localhost:4000/peminjaman`;

    try {
      setDataPeminjaman([]);
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        const data = await response.json();
        setDataPeminjaman(data);
      } else if (response.status === 404) {
        setDataPeminjaman([]);
      }
    } catch (error) {
      setDataPeminjaman(false);
    }
  }

  const columns = [
    {
      field: "userId",
      headerName: "Pengirim",
      width: 250,
      editable: true,
    },
    {
      field: "bukuId",
      headerName: "Judul Buku",
      width: 300,
      editable: true,
    },
    {
      field: "status",
      headerName: "Status",
      width: 400,
      editable: true,
    },
  ];

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <Navbar />
      <div
        style={{
          textAlign: "right",
          width: "100%",
        }}
      >
        <a href="/Peminjaman/create">
          <button
            style={{
              marginRight: 80,
              marginTop: 40,
              width: 80,
              height: 30,
              color: "#fff",
              fontWeight: 600,
              borderRadius: "5px",
              letterSpacing: 1,
              border: "1px solid #1944a1",
              backgroundColor: "#1944a1",
            }}
          >
            CREATE
          </button>
        </a>
      </div>
      <center>
        <Box style={{ width: "90%", marginTop: 40 }}>
          <DataGrid
            getRowId={(dataPeminjaman) => dataPeminjaman._id}
            rows={dataPeminjaman}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 100,
                },
              },
            }}
            pageSizeOptions={[100]}
          />
        </Box>
      </center>
    </div>
  );
}
