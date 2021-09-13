import './App.css';
import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import {Grid} from '@material-ui/core';
import NavBar from './navbar';


const columns = [
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'units', label: 'Units', minWidth: 100 },
  { id: 'price', label: 'Price', minWidth: 170, align: 'right', format: (value) => value.toLocaleString('en-US'), },
];

const useStyles = makeStyles((theme)=>({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  paper: {
    maxWidth: 1200,
    margin: `${theme.spacing(1)}px auto`,
    padding: theme.spacing(2),
    textAlign: 'right',
    color: theme.palette.text.secondary,
  },
}));

function App() {

  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [productList, setProductList] = useState([]);

  // When the page loads, all the products are fetching from the backend
  useEffect(()=>{
    getProductsList();
  },[]);

  const getProductsList = async ()=>{
    const response = await fetch("http://localhost:8080/products/pricing/list", {
      method: "GET",
      headers: {"Content-Type": "application/json"}
    });
    const data = await response.json();
    var rows = [];
    data.map(({name, units, price})=>{
      rows.push({name, units, price});
    });
    setProductList(rows);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div className="App">
        <NavBar/>
      <Grid>
      <Paper className={classes.paper}>
      <TableContainer className={classes.container}>
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
            {productList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === 'number' ? column.format(value) : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[3, 5, 100]}
        component="div"
        count={productList.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
    </Grid>
    </div>
  );
}

export default App;
