import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import Navbar from "../../Components/Navbar";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";

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
    {
      width: 200,
      field: "action",
      headerName: "Action",
      sortable: false,
      renderCell: (params) => {
        const onClick = () => {
          const id = params.id;
          try {
            const response = fetch(`http://localhost:4000/kategori/${id}`, {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            });

            if (response.status === 201 || 204) {
              alert("Data berhasil dihapus");
              fetchData();
            } else if (response.status === 400) {
              alert("Gagal mengubah data");
            } else {
              console.log('Gagal')
            }
          } catch (error) {
            console.error("Error: ", error);
          }
        };

        return (
          <div>
            <Button onClick={onClick}>HAPUS</Button>
          </div>
        );      },
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
            slots={{ toolbar: GridToolbar }}
          />
        </Box>
      </center>
    </div>
  );
}
