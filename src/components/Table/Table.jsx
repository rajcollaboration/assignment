import React, { useState, useEffect } from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Skeleton,
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { deleteEmployee, getEmployee } from '../../Redux/Actions/employeeAction';
import { useNavigate } from 'react-router-dom';

const columns = [
  { id: 'fullName', label: 'Full Name', minWidth: 170 },
  { id: 'email', label: 'Email', minWidth: 100 },
  { id: 'phone', label: 'Phone', minWidth: 170, align: 'right' },
  { id: 'image', label: 'Image', minWidth: 170, align: 'right' },
  { id: 'age', label: 'Age', minWidth: 170, align: 'right' },
  { id: 'salary', label: 'Salary', minWidth: 170, align: 'right' },
  { id: 'action', label: 'Action', minWidth: 170, align: 'right' },
];

export default function StickyHeadTable() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [open, setOpen] = useState(false);
  const [deleteRow, setDeleteRow] = useState(null);

  const data = useSelector((state) => state.employeeList);
  const { isLoading, deleteEmpl } = useSelector((state) => state);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getEmployee());
  }, [dispatch]);

  useEffect(() => {
    if (deleteEmpl?.data) {
      dispatch(getEmployee());
    }
  }, [deleteEmpl, dispatch]);

  const rows = data?.data || [];

  const handleEdit = (row) => {
    navigate(`employeeForm?id=${row?._id}`);
  };

  const handleClickOpen = (row) => {
    setOpen(true);
    setDeleteRow(row);
  };

  const handleClose = () => {
    setOpen(false);
    setDeleteRow(null);
  };

  const handleDelete = () => {
    setOpen(false);
    setDeleteRow(null);
    if (deleteRow?._id) {
      dispatch(deleteEmployee(deleteRow._id));
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.isLoading && rows.length === 0 ? (
              Array.from({ length: 5 }).map((_, index) => (
                <TableRow key={index}>
                  {columns.map((column) => (
                    <TableCell key={column.id}>
                      <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : rows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns.length} align="center">
                  No data found.
                </TableCell>
              </TableRow>
            ) : (
              rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.id === 'action' ? (
                            <div>
                              <IconButton
                                color="primary"
                                onClick={() => handleEdit(row)}
                              >
                                <EditIcon />
                              </IconButton>
                              <IconButton
                                color="secondary"
                                onClick={() => handleClickOpen(row)}
                              >
                                <DeleteIcon />
                              </IconButton>
                            </div>
                          ) : column.id === 'image' ? (
                            <img
                              src={value}
                              alt="Employee"
                              style={{
                                width: 50,
                                height: 50,
                                borderRadius: '50%',
                              }}
                            />
                          ) : (
                            value
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this employee? This action cannot be
          undone.
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            No
          </Button>
          <Button onClick={handleDelete} color="error">
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
}
