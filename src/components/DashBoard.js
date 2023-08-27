import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  TableSortLabel,
  TableFooter,
  TableCell,
  tableCellClasses,
  Button,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import { useFetch } from "../helper/useFetch";
import { FormDialog } from "./AddEmployee";
import BasicModal from "./DeleteConfirmation";
import { TablePaginationActions } from "./TablePagnination";
import { TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { Search } from "@mui/icons-material";
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    color: theme.palette.common.black,
    fontSize: 20,
    fontWeight: 500,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function CustomizedTables() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [showModal, setShowModal] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);
  const [orderBy, setOrderBy] = useState("");
  const [order, setOrder] = useState("asc");
  const [editEnable, setEditEnable] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [sortedData, SetSortedData] = useState([]);
  const { data, executeFetch } = useFetch(
    "http://localhost:4000/employees",
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    },
    { immediate: false }
  );

  React.useEffect(() => {
    executeFetch();
  }, [open]);

  const handleClickOpen = () => {
    setOpen(!open);
    setEditEnable(false);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value));
    setPage(0);
  };

  const handleShowModal = (event, row, type) => {
    setSelectedValue(row);
    setEditEnable(type === "edit" ? true : false);
    setOpen(type === "edit" ? true : false);
    if (type !== "edit") {
      setShowModal(!showModal);
    }
  };

  const handleSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  useEffect(() => {
    if (data) {
      const filterData =
        data?.length &&
        [...data].sort((a, b) => {
          if (order === "asc") {
            if (typeof a[orderBy] === "string") {
              return a[orderBy].localeCompare(b[orderBy]);
            } else {
              return a[orderBy] - b[orderBy];
            }
          } else {
            if (typeof a[orderBy] === "string") {
              return b[orderBy].localeCompare(a[orderBy]);
            } else {
              return b[orderBy] - a[orderBy];
            }
          }
        });
      SetSortedData(filterData);
    }
  }, [data]);

  const handleInputChange = (e) => {
    SetSortedData(
      data.filter(
        (employee) =>
          employee.employee_name &&
          employee.employee_salary.includes(e.target.value)
      )
    );
  };

  return (
    <>
      <FormDialog
        {...{
          editEnable,
          setEditEnable,
          handleClickOpen,
          open,
        }}
        editValue={selectedValue}
      />
      <TableContainer component={Paper}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="outlined-basic"
          label="Search"
          type="text"
          name="username"
          variant="outlined"
          onChange={handleInputChange}
        />
        <Table sx={{ minWidth: 650 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell style={{ width: 160 }}>
                <TableSortLabel
                  active={orderBy === "employee_name"}
                  direction={orderBy === "employee_name" ? order : "asc"}
                  onClick={() => handleSort("employee_name")}
                >
                  Employee Name
                </TableSortLabel>
              </StyledTableCell>
              <StyledTableCell align="right" style={{ width: 160 }}>
                <TableSortLabel
                  active={orderBy === "employee_salary"}
                  direction={orderBy === "employee_salary" ? order : "asc"}
                  onClick={() => handleSort("employee_salary")}
                >
                  Salary
                </TableSortLabel>
              </StyledTableCell>
              <StyledTableCell align="right" style={{ width: 160 }}>
                <TableSortLabel
                  active={orderBy === "employee_age"}
                  direction={orderBy === "employee_age" ? order : "asc"}
                  onClick={() => handleSort("employee_age")}
                >
                  Age
                </TableSortLabel>
              </StyledTableCell>
              <StyledTableCell align="center" style={{ width: 160 }}>
                Action
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? sortedData?.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : sortedData
            )?.length
              ? (rowsPerPage > 0
                  ? sortedData?.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                  : sortedData
                ).map((row) => (
                  <StyledTableRow key={row.name}>
                    <StyledTableCell component="th" scope="row">
                      {row.employee_name}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {row.employee_salary}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {row.employee_age}
                    </StyledTableCell>
                    <StyledTableCell
                      align="center"
                      sx={{
                        display: "flex",
                        gap: 2,
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {/* <Typography> */}
                      <Button
                        variant="outlined"
                        color="success"
                        startIcon={<EditIcon />}
                        onClick={(event) => handleShowModal(event, row, "edit")}
                      >
                        Edit
                      </Button>
                      <BasicModal
                        handleShowModal={(event) => handleShowModal(event, row)}
                        showModal={showModal}
                        selectedValue={selectedValue}
                        executeFetch={executeFetch}
                      />
                      {/* </Typography> */}
                    </StyledTableCell>
                  </StyledTableRow>
                ))
              : "No Data "}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                count={sortedData?.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: {
                    "aria-label": "rows per page",
                  },
                  native: true,
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </>
  );
}
