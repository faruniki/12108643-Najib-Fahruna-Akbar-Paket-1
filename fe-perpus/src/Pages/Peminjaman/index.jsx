import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import * as XLSX from "xlsx";
import Navbar from "../../Components/Navbar";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import { Button, Modal, TextField } from "@mui/material";

export default function Peminjaman() {
  const token = Cookies.get("access_token") || "";
  const [dataPeminjaman, setDataPeminjaman] = useState("");

  const [findById, setFindById] = useState("");

  async function fetchData() {
    const apiUrl = `http://localhost:4000/peminjaman`;

    try {
      setDataPeminjaman([]);
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        const data = await response.json();
        setDataPeminjaman(data);
      } else if (response.status === 404) {
        setDataPeminjaman([]);
      }
    } catch (error) {
      setDataPeminjaman(false);
    }
  }

  const [dataBuku, setDataBuku] = useState([]);

  const [editedPeminjaman, setEditedPeminjaman] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = (review) => {
    setEditedPeminjaman(review);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(
        `http://localhost:4000/peminjaman/${editedPeminjaman._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(editedPeminjaman),
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
        
      } else if (response.status === 404) {
      }
    } catch (error) {}
  }

  useEffect(() => {
    profile();
  }, []);

  const exportToExcel = () => {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(dataPeminjaman.map(item => ({
      userId: item.userId.username,
      bukuId: item.bukuId.judul,
      status: item.status,
      tanggal_peminjaman: item.tanggal_peminjaman,
      tanggal_pengembalian: item.tanggal_pengembalian
    })));
    
    XLSX.utils.book_append_sheet(wb, ws, "Data Peminjaman");
    XLSX.writeFile(wb, "data_peminjaman.xlsx");
  };
  
  

  const columns = [
    {
      field: "userId",
      headerName: "Peminjam",
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
      width: 300,
      renderCell: (params) => {
        if (params.row.bukuId) {
          return params.row.bukuId.judul;
        } else {
          return "N/A";
        }
      },
    },
    {
      field: "status",
      headerName: "Status",
      width: 400,
    },
    {
      field: "tanggal_peminjaman",
      headerName: "Tanggal Peminjaman",
      width: 400,
    },
    {
      field: "tanggal_pengembalian",
      headerName: "Tanggal Pengembalian",
      width: 400,
      renderCell: (params) => {
        if (params.row.tanggal_pengembalian) {
          return params.row.tanggal_pengembalian;
        } else {
          return "N/A";
        }
      },
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
            const response = fetch(`http://localhost:4000/peminjaman/${id}`, {
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
            <Button onClick={onClickEdit}>EDIT</Button>
            <Button onClick={onClickDelete}>HAPUS</Button>
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
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <h2 style={{ marginTop: 40, marginLeft: "5%" }}>Peminjaman</h2>
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
          <a href="/peminjaman/create">
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
            getRowId={(dataPeminjaman) => dataPeminjaman._id}
            rows={dataPeminjaman}
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
              value={editedPeminjaman.bukuId}
              onChange={(e) =>
                setEditedPeminjaman({
                  ...editedPeminjaman,
                  bukuId: e.target.value,
                })
              }
              style={{
                width: "400px",
                height: "40px",
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
            <select
              value={editedPeminjaman.status}
              onChange={(e) =>
                setEditedPeminjaman({
                  ...editedPeminjaman,
                  status: e.target.value,
                })
              }
              style={{
                width: "400px",
                height: "40px",
                borderRadius: "5px",
                border: "1px solid grey",
                backgroundColor: "#f4f4f4",
                padding: "2px 10px",
                fontSize: "14px",
                marginBottom: "10px",
                marginTop: "10px",
              }}
            >
              <option value="dipinjam">Di Pinjam</option>
              <option value="dikembalikan">Di Kembalikan</option>
            </select>
            <br />
            {editedPeminjaman.status === "dikembalikan" && (
              <input
                type="date"
                placeholder="Tanggal Pengembalian"
                value={editedPeminjaman.tanggal_pengembalian}
                onChange={(e) =>
                  setEditedPeminjaman({
                    ...editedPeminjaman,
                    tanggal_pengembalian: e.target.value,
                  })
                }
                style={{
                  width: "378px",
                  height: "40px",
                  borderRadius: "5px",
                  border: "1px solid grey",
                  backgroundColor: "#f4f4f4",
                  padding: "2px 10px",
                  fontSize: "14px",
                  marginBottom: "10px",
                  marginTop: "10px",
                }}
              ></input>
            )}

            <Button onClick={handleUpdate}>Update</Button>
          </Box>
        </Modal>
      </center>
    </div>
  );
}