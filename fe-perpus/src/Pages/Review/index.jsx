import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import Navbar from "../../Components/Navbar";
import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";

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
          />
        </Box>
      </center>
    </div>
  );
}
