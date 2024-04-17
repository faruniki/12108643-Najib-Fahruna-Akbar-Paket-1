import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import Navbar from "../../Components/Navbar";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";

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
    {
      width: 200,
      field: "action",
      headerName: "Action",
      sortable: false,
      renderCell: (params) => {
        const onClick = () => {
          const id = params.id;
          try {
            const response = fetch(`http://localhost:4000/buku/${id}`, {
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
              console.log("Gagal");
            }
          } catch (error) {
            console.error("Error: ", error);
          }
        };

        return (
          <div>
            <Button onClick={onClick}>HAPUS</Button>
          </div>
        );
      },
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
            slots={{ toolbar: GridToolbar }}
          />
        </Box>
      </center>
    </div>
  );
}
