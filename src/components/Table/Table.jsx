import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from 'react-redux';
import { getEmployee } from '../../Redux/Actions/employeeAction';

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
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const data = useSelector((state) => state.employeeList);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getEmployee());
  }, [dispatch]);

  const rows = data?.data || []; // Ensure rows are defined, fallback to an empty array

  const handleEdit = (row) => {
    console.log('Edit:', row);
    // Implement your edit logic here
  };

  const handleDelete = (row) => {
    console.log('Delete:', row);
    // Implement your delete logic here
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
            {rows
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
                              onClick={() => handleDelete(row)}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </div>
                        ) : column.id === 'image' ? (
                          <img
                            src={value}
                            alt="Employee"
                            style={{ width: 50, height: 50, borderRadius: '50%' }}
                          />
                        ) : (
                          value
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
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
    </Paper>
  );
}
