import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import Navbar from "../../Components/Navbar";
import { DataGrid, GridActionsCell } from "@mui/x-data-grid";
import Box from "@mui/material/Box";

export default function Buku() {
  const token = Cookies.get("access_token") || "";
  const [dataBuku, setDataBuku] = useState("");
  async function fetchData() {
    const apiUrl = `http://localhost:4000/buku`;

    try {
      setDataBuku([]);
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        const data = await response.json();
        setDataBuku(data);
      } else if (response.status === 404) {
        setDataBuku([]);
      }
    } catch (error) {
      setDataBuku(false);
    }
  }

  const columns = [
    {
      field: "judul",
      headerName: "Judul Buku",
      width: 400,
      editable: true,
    },
    {
      field: "penulis",
      headerName: "Penulis",
      width: 300,
      editable: true,
    },
    {
      field: "penerbit",
      headerName: "Penerbit",
      width: 250,
      editable: true,
    },
    {
      field: "tahun_terbit",
      headerName: "Tahun Terbit",
      width: 150,
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
        <a href="/buku/create">
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
            getRowId={(dataBuku) => dataBuku._id}
            rows={dataBuku}
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
