import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import * as XLSX from "xlsx";
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

  const exportToExcel = () => {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(dataKategori);
    XLSX.utils.book_append_sheet(wb, ws, "Data Kategori");
    XLSX.writeFile(wb, "data_kategori.xlsx");
  };

  const columns = [
    {
      field: "nama_kategori",
      headerName: "Nama Kategori",
      width: 900,
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
              console.log("Gagal");
            }
          } catch (error) {
            console.error("Error: ", error);
          }
        };

        return (
          <div>
            {(role === "p" || role === "a") && (
              <Button onClick={onClick}>HAPUS</Button>
            )}
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    fetchData();
  }, []);

  const [role, setRole] = useState("");

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
        setRole(data.role);
      } else if (response.status === 404) {
        setRole("");
      }
    } catch (error) {
      setRole("");
    }
  }

  useEffect(() => {
    profile();
  }, []);

  return (
    <div>
      <Navbar />
      <div
        style={{
          textAlign: "right",
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <h2 style={{ marginTop: 40, marginLeft: "5%" }}>Kategori</h2>
        {(role === "p" || role === "a") && (
          <div>
            <button
              style={{
                marginRight: 10,
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
              onClick={exportToExcel}
            >
              EXPORT
            </button>
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
        )}
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
