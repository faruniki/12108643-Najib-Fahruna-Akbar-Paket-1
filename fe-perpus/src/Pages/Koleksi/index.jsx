import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import Navbar from "../../Components/Navbar";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";

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
    {
      width: 200,
      field: "action",
      headerName: "Action",
      sortable: false,
      renderCell: (params) => {
        const onClick = () => {
          const id = params.id;
          try {
            const response = fetch(`http://localhost:4000/koleksi/${id}`, {
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
            slots={{ toolbar: GridToolbar }}
          />
        </Box>
      </center>
    </div>
  );
}
