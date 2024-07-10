import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  Snackbar,
  SnackbarContent,
  DialogContentText, // Import DialogContentText
} from '@mui/material';

const ProductList = () => {
  const [rows, setRows] = useState([]);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editData, setEditData] = useState({
    id: null,
    name: '',
    lastname: '',
    email: '',
    salary: '',
    phone: '',
  });
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [addDialogOpen, setAddDialogOpen] = useState(false); // State for add dialog
  const [addData, setAddData] = useState({
    name: '',
    lastname: '',
    email: '',
    salary: '',
    phone: '',
  });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarType, setSnackbarType] = useState('success'); // success or error

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get('http://localhost:5000/api/data')
      .then((response) => {
        setRows(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  const handleEdit = (id) => {
    const rowData = rows.find((row) => row.id === id);
    setEditData(rowData);
    setEditDialogOpen(true);
  };

  const handleDelete = (id) => {
    setDeleteId(id);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    axios
      .delete(`http://localhost:5000/api/data/${deleteId}`)
      .then(() => {
        fetchData();
        setDeleteDialogOpen(false);
        showSuccessMessage('Row deleted successfully');
      })
      .catch((error) => {
        console.error('Error deleting data:', error);
        showErrorMessage('Failed to delete row');
      });
  };

  const handleDialogClose = () => {
    setEditDialogOpen(false);
    setEditData({
      id: null,
      name: '',
      lastname: '',
      email: '',
      salary: '',
      phone: '',
    });
  };

  const handleDialogSave = () => {
    const { id, name, lastname, email, salary, phone } = editData;

    axios
      .put(`http://localhost:5000/api/data/${id}`, {
        name,
        lastname,
        email,
        salary,
        phone,
      })
      .then(() => {
        fetchData();
        handleDialogClose();
        showSuccessMessage('Row updated successfully');
      })
      .catch((error) => {
        console.error('Error updating data:', error);
        showErrorMessage('Failed to update row');
      });
  };

  const showSuccessMessage = (message) => {
    setSnackbarMessage(message);
    setSnackbarType('success');
    setSnackbarOpen(true);
  };

  const showErrorMessage = (message) => {
    setSnackbarMessage(message);
    setSnackbarType('error');
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleAddDialogOpen = () => {
    setAddData({
      name: '',
      lastname: '',
      email: '',
      salary: '',
      phone: '',
    });
    setAddDialogOpen(true);
  };

  const handleAddDialogClose = () => {
    setAddDialogOpen(false);
    setAddData({
      name: '',
      lastname: '',
      email: '',
      salary: '',
      phone: '',
    });
  };

  const handleAddDialogSave = () => {
    axios
      .post('http://localhost:5000/api/data', addData)
      .then(() => {
        fetchData();
        handleAddDialogClose();
        showSuccessMessage('New row added successfully');
      })
      .catch((error) => {
        if (error.response && error.response.status === 400) {
          showErrorMessage('Email already exists');
        } else {
          console.error('Error adding new row:', error);
          showErrorMessage('Failed to add new row');
        }
      });
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'lastname', headerName: 'Lastname', width: 150 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'salary', headerName: 'Salary', width: 150 },
    { field: 'phone', headerName: 'Phone', width: 150 },
    {
      field: 'actions',
      headerName: 'Actions',
      type: 'actions',
      width: 150,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<EditIcon />}
          label="Edit"
          onClick={() => handleEdit(params.id)}
        />,
        <GridActionsCellItem
          icon={<DeleteIcon />}
          label="Delete"
          onClick={() => handleDelete(params.id)}
        />,
      ],
    },
  ];

  return (
    <div style={{ height: 400, width: '100%' }}>
    <h3>Employee list</h3>
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        onClick={handleAddDialogOpen}
        style={{ marginBottom: 16 }}
      >
        Add New
      </Button>
      <DataGrid rows={rows} columns={columns} />
      <Dialog open={editDialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Edit Data</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Name"
            type="text"
            fullWidth
            value={editData.name}
            onChange={(e) => setEditData({ ...editData, name: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Lastname"
            type="text"
            fullWidth
            value={editData.lastname}
            onChange={(e) =>
              setEditData({ ...editData, lastname: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label="Email"
            type="email"
            fullWidth
            value={editData.email}
            onChange={(e) => setEditData({ ...editData, email: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Salary"
            type="text"
            fullWidth
            value={editData.salary}
            onChange={(e) =>
              setEditData({ ...editData, salary: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label="Phone"
            type="text"
            fullWidth
            value={editData.phone}
            onChange={(e) => setEditData({ ...editData, phone: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDialogSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
           
            <h4> Are you sure you want to delete this row?</h4> 
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={confirmDelete} color="primary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={addDialogOpen} onClose={handleAddDialogClose}>
        <DialogTitle>Add New Data</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Name"
            type="text"
            fullWidth
            value={addData.name}
            onChange={(e) => setAddData({ ...addData, name: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Lastname"
            type="text"
            fullWidth
            value={addData.lastname}
            onChange={(e) =>
              setAddData({ ...addData, lastname: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label="Email"
            type="email"
            fullWidth
            value={addData.email}
            onChange={(e) => setAddData({ ...addData, email: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Salary"
            type="text"
            fullWidth
            value={addData.salary}
            onChange={(e) =>
              setAddData({ ...addData, salary: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label="Phone"
            type="text"
            fullWidth
            value={addData.phone}
            onChange={(e) => setAddData({ ...addData, phone: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddDialogSave} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <SnackbarContent
          style={{
            backgroundColor: snackbarType === 'success' ? 'green' : 'red',
          }}
          message={snackbarMessage}
        />
      </Snackbar>
    </div>
  );
};

export default ProductList;
