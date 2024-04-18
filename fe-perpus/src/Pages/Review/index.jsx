import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import * as XLSX from "xlsx";
import Navbar from "../../Components/Navbar";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import { Button, Modal, TextField } from "@mui/material";

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

  const [dataBuku, setDataBuku] = useState([]);

  const [editedReview, setEditedReview] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = (review) => {
    setEditedReview(review);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(
        `http://localhost:4000/review/${editedReview._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(editedReview),
        }
      );

      if (response.status === 200) {
        alert("Data berhasil diperbarui");
        handleCloseModal();
        fetchData();
      } else {
        alert("Gagal mengubah data");
      }
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  async function fetchBuku() {
    const apiUrl = `http://localhost:4000/buku`;

    try {
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setDataBuku(data);
      } else {
        console.error("Failed to fetch reviews");
      }
    } catch (error) {
      console.error("Error fetching reviews: ", error);
    }
  }

  useEffect(() => {
    fetchBuku();
  }, []);

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
        setEditedReview({ ...editedReview, userId: data._id });
      } else if (response.status === 404) {
      }
    } catch (error) {}
  }

  useEffect(() => {
    profile();
  }, []);

  const exportToExcel = () => {
    const wb = XLSX.utils.book();
    const ws = XLSX.utils.json_to_sheet(dataReview);
    XLSX.utils.book_append_sheet(wb, ws, "Data Review");
    XLSX.writeFile(wb, "data_ulasan.xlsx");
  };

  const columns = [
    {
      field: "userId",
      headerName: "Pengirim",
      width: 250,
      renderCell: (params) => {
        if (params.row.userId) {
          return params.row.userId.username;
        } else {
          return "N/A";
        }
      },
    },
    {
      field: "bukuId",
      headerName: "Judul Buku",
      width: 400,
      renderCell: (params) => {
        if (params.row.bukuId) {
          return params.row.bukuId.judul;
        } else {
          return "N/A";
        }
      },
    },
    {
      field: "review",
      headerName: "Review",
      width: 400,
    },
    {
      field: "rating",
      headerName: "Rating",
      width: 150,
    },
    {
      width: 200,
      field: "action",
      align: "center",
      headerAlign: "center",
      headerName: "Action",
      sortable: false,
      renderCell: (params) => {
        const onClickDelete = () => {
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

        const onClickEdit = () => {
          handleOpenModal(params.row);
        };

        return (
          <div>
            {(role === "p" || role === "a") && (
              <div>
                {/* <Button onClick={onClickEdit}>EDIT</Button> */}
                <Button onClick={onClickDelete}>HAPUS</Button>
              </div>
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
        <h2 style={{ marginTop: 40, marginLeft: "5%" }}>Review</h2>
        <div>
          {(role === "p" || role === "a") && (
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
          )}
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
        <Modal open={isModalOpen} onClose={handleCloseModal}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 4,
            }}
          >
            <select
              value={editedReview.bukuId}
              onChange={(e) =>
                setEditedReview({ ...editedReview, bukuId: e.target.value })
              }
              style={{
                width: "400px",
                height: "60px",
                borderRadius: "5px",
                border: "1px solid grey",
                backgroundColor: "#f4f4f4",
                padding: "2px 10px",
                fontSize: "14px",
                marginBottom: "10px",
              }}
            >
              <option value="">Pilih Buku</option>
              {dataBuku.map((buku) => (
                <option key={buku._id} value={buku._id}>
                  {buku.judul}
                </option>
              ))}
            </select>
            <TextField
              label="Review"
              fullWidth
              value={editedReview.review}
              onChange={(e) =>
                setEditedReview({ ...editedReview, review: e.target.value })
              }
              sx={{ mb: 2 }}
            />
            <TextField
              label="Rating 1/10"
              fullWidth
              value={editedReview.rating}
              onChange={(e) =>
                setEditedReview({ ...editedReview, rating: e.target.value })
              }
              sx={{ mb: 2 }}
            />
            <Button onClick={handleUpdate}>Update</Button>
          </Box>
        </Modal>
      </center>
    </div>
  );
}
