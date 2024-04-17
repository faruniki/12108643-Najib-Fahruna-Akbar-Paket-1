import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import Navbar from "../../Components/Navbar";
import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";

export default function Kategori() {
  const token = Cookies.get("access_token") || "";
  const [dataKategori, setDataKategori] = useState("");

  async function fetchData() {
    const apiUrl = `http://localhost:4000/kategori`;

    try {
      setDataKategori([]);
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        const data = await response.json();
        setDataKategori(data);
      } else if (response.status === 404) {
        setDataKategori([]);
      }
    } catch (error) {
      setDataKategori(false);
    }
  }

  const columns = [
    {
      field: "nama_kategori",
      headerName: "Nama Kategori",
      width: 900,
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
        <a href="/kategori/create">
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
            getRowId={(dataKategori) => dataKategori._id}
            rows={dataKategori}
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
