import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import Navbar from "../../Components/Navbar";
import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";

export default function Koleksi() {
  const token = Cookies.get("access_token") || "";
  const [dataKoleksi, setDataKoleksi] = useState("");

  async function fetchData() {
    const apiUrl = `http://localhost:4000/koleksi`;

    try {
      setDataKoleksi([]);
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        const data = await response.json();
        setDataKoleksi(data);
      } else if (response.status === 404) {
        setDataKoleksi([]);
      }
    } catch (error) {
      setDataKoleksi(false);
    }
  }

  const columns = [
    {
      field: "bukuId",
      headerName: "Judul Buku",
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
        <a href="/koleksi/create">
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
            getRowId={(dataKoleksi) => dataKoleksi._id}
            rows={dataKoleksi}
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
