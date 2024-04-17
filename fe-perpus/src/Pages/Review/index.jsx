import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import Navbar from "../../Components/Navbar";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";

export default function Review() {
  const token = Cookies.get("access_token") || "";
  const [dataReview, setDataReview] = useState("");

  async function fetchData() {
    const apiUrl = `http://localhost:4000/review`;

    try {
      setDataReview([]);
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        const data = await response.json();
        setDataReview(data);
      } else if (response.status === 404) {
        setDataReview([]);
      }
    } catch (error) {
      setDataReview(false);
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
      field: "review",
      headerName: "Review",
      width: 400,
      editable: true,
    },
    {
      field: "rating",
      headerName: "Rating",
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
            const response = fetch(`http://localhost:4000/review/${id}`, {
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
        <a href="/review/create">
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
            getRowId={(dataReview) => dataReview._id}
            rows={dataReview}
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
