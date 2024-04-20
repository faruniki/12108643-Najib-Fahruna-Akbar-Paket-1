import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import * as XLSX from "xlsx";
import Navbar from "../../Components/Navbar";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import { Button, Modal, TextField } from "@mui/material";

export default function Users() {
  const token = Cookies.get("access_token") || "";
  const [dataUsers, setDataUsers] = useState([]);

  async function fetchData() {
    const apiUrl = `http://localhost:4000/auth`;
    try {
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 201) {
        const data = await response.json();
        setDataUsers(data);
      } else if (response.status === 404) {
        setDataUsers([]);
      } else {
        setDataUsers(false);
      }
    } catch (error) {
      setDataUsers(false);
    }
  }

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedUsers, setEditedUsers] = useState({});

  const exportToExcel = () => {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(dataUsers);
    XLSX.utils.book_append_sheet(wb, ws, "Data Users");
    XLSX.writeFile(wb, "data_users.xlsx");
  };

  const handleOpenModal = (book) => {
    setEditedUsers(book);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(
        `http://localhost:4000/atuh/${editedUsers._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(editedUsers),
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

  const columns = [
    {
      field: "username",
      headerName: "Username",
      width: 400,
    },
    {
      field: "email",
      headerName: "Email",
      width: 300,
    },
    {
      field: "role",
      headerName: "Role",
      width: 250,
      renderCell: (params) => {
        let roleLabel = "";
        switch (params.value) {
          case "u":
            roleLabel = "user";
            break;
          case "a":
            roleLabel = "admin";
            break;
          case "p":
            roleLabel = "petugas";
            break;
          default:
            roleLabel = "unknown";
            break;
        }
        return <div>{roleLabel}</div>;
      },
    },
    {
      field: "address",
      headerName: "Alamat",
      width: 150,
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
            const response = await fetch(`http://localhost:4000/auth/${id}`, {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            });

            if (response.status === 200 || response.status === 204) {
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
        <h2 style={{ marginTop: 40, marginLeft: "5%" }}>Users</h2>
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
          <a href="/users/create">
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
            getRowId={(dataUsers) => dataUsers._id}
            rows={dataUsers}
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
            <TextField
              label="Username"
              fullWidth
              value={editedUsers.username}
              onChange={(e) =>
                setEditedUsers({ ...editedUsers, username: e.target.value })
              }
              sx={{ mb: 2 }}
            />
            <TextField
              label="Email"
              fullWidth
              value={editedUsers.email}
              onChange={(e) =>
                setEditedUsers({ ...editedUsers, email: e.target.value })
              }
              sx={{ mb: 2 }}
            />
            <TextField
              label="Alamat"
              fullWidth
              value={editedUsers.address}
              onChange={(e) =>
                setEditedUsers({ ...editedUsers, address: e.target.value })
              }
              sx={{ mb: 2 }}
            />
            <select
              value={editedUsers.role}
              onChange={(e) =>
                setEditedUsers({ ...editedUsers, role: e.target.value })
              }
              style={{
                width: "400px",
                height: "60px",
                borderRadius: "5px",
                border: "1px solid grey",
                backgroundColor: "#fff",
                padding: "2px 10px",
                fontSize: "14px",
                marginBottom: "10px",
              }}
            >
              <option value="">Pilih Role</option>
              <option value="a">Admin</option>
              <option value="p">Petugas</option>
              <option value="u">User</option>
            </select>
            <Button onClick={handleUpdate}>Update</Button>
          </Box>
        </Modal>
      </center>
    </div>
  );
}
