import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import * as XLSX from "xlsx";
import Navbar from "../../Components/Navbar";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import { Button, Modal, TextField } from "@mui/material";

export default function Buku() {
  const token = Cookies.get("access_token") || "";
  const [dataBuku, setDataBuku] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedBook, setEditedBook] = useState({});

  async function fetchData() {
    const apiUrl = `http://localhost:4000/buku`;

    try {
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

  const handleOpenModal = (book) => {
    setEditedBook(book);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(
        `http://localhost:4000/buku/${editedBook._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(editedBook),
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

  const columns = [
    {
      field: "judul",
      headerName: "Judul Buku",
      width: 400,
    },
    {
      field: "penulis",
      headerName: "Penulis",
      width: 300,
    },
    {
      field: "penerbit",
      headerName: "Penerbit",
      width: 250,
    },
    {
      field: "tahun_terbit",
      headerName: "Tahun Terbit",
      width: 150,
    },
    {
      field: "gambar",
      headerName: "Tahun Terbit",
      width: 150,
      renderCell: (params) => {
        if (params.row.kategoriId) {
          return (
            <img
              src={params.row.gambar}
              alt={params.row.judul}
              style={{ width: 100, height: 100 }}
            />
          );
        } else {
          return "N/A";
        }
      },
    },
    {
      field: "kategoriId",
      headerName: "Kategori",
      width: 150,
      renderCell: (params) => {
        if (params.row.kategoriId) {
          return params.row.kategoriId.nama_kategori;
        } else {
          return "N/A";
        }
      },
    },
    {
      width: 200,
      field: "action",
      headerName: "Action",
      headerAlign: "center",
      align: "center",
      sortable: false,
      renderCell: (params) => {
        const onClickDelete = async () => {
          const id = params.id;
          try {
            const response = await fetch(`http://localhost:4000/buku/${id}`, {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            });

            if (response.status === 201 || response.status === 204) {
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
                <Button onClick={onClickEdit}>EDIT</Button>
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

  const exportToExcel = () => {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(dataBuku);
    XLSX.utils.book_append_sheet(wb, ws, "Data Buku");
    XLSX.writeFile(wb, "data_buku.xlsx");
  };

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
        <h2 style={{ marginTop: 40, marginLeft: "5%" }}>Buku</h2>
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
        )}
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
          <TextField
            label="Judul Buku"
            fullWidth
            value={editedBook.judul}
            onChange={(e) =>
              setEditedBook({ ...editedBook, judul: e.target.value })
            }
            sx={{ mb: 2 }}
          />
          <TextField
            label="Penulis"
            fullWidth
            value={editedBook.penulis}
            onChange={(e) =>
              setEditedBook({ ...editedBook, penulis: e.target.value })
            }
            sx={{ mb: 2 }}
          />
          <TextField
            label="Penerbit"
            fullWidth
            value={editedBook.penerbit}
            onChange={(e) =>
              setEditedBook({ ...editedBook, penerbit: e.target.value })
            }
            sx={{ mb: 2 }}
          />
          <TextField
            label="Tahun Terbit"
            fullWidth
            value={editedBook.tahun_terbit}
            onChange={(e) =>
              setEditedBook({ ...editedBook, tahun_terbit: e.target.value })
            }
            sx={{ mb: 2 }}
          />
          <Button onClick={handleUpdate}>Update</Button>
        </Box>
      </Modal>
    </div>
  );
}
