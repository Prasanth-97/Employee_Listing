import React, { useEffect, useState } from "react";

import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogTitle,
} from "@mui/material";
import { Box } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { v4 as uuidv4 } from "uuid";
import { useFetch } from "../helper/useFetch";

export function FormDialog({
  editValue,
  editEnable,
  setEditEnable,
  handleClickOpen,
  open,
}) {
  const initialState = {
    id: "",
    employee_name: "",
    employee_age: "",
    employee_salary: "",
    profile_image: "",
  };
  const [userDetails, setUserDetails] = useState(initialState);

  console.log("userDetails", userDetails);

  const { data, isPending, executeFetch } = useFetch(
    editEnable
      ? `http://localhost:4000/employees/${editValue?.id}`
      : "http://localhost:4000/employees",
    {
      method: editEnable ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...userDetails,
        id: editEnable ? editValue?.id : uuidv4(),
      }),
    },
    { immediate: false }
  );

  useEffect(() => {
    editEnable ? setUserDetails(editValue) : setUserDetails(initialState);
  }, [editValue, editEnable]);

  console.log("userDetails", userDetails);

  const handleInput = (event) => {
    console.log(event);
    const { name, value } = event.target;
    setUserDetails((userDetails) => ({ ...userDetails, [name]: value }));
  };

  const handleAddEmployee = async () => {
    await executeFetch();
    setUserDetails(initialState);
    handleClickOpen();
    setEditEnable(false);
  };

  return (
    <div>
      <Button
        variant="contained"
        onClick={handleClickOpen}
        sx={{ margin: "15px" }}
      >
        <AddIcon /> Add Employee
      </Button>
      <Dialog
        open={open}
        onClose={handleClickOpen}
        fullWidth={true}
        maxWidth="xs"
      >
        <DialogTitle align="center">
          {editEnable ? "Edit" : "Add"} Employee{" "}
        </DialogTitle>
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "95%" },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="outlined-basic"
            label="Name"
            type="text"
            variant="outlined"
            name="employee_name"
            value={userDetails.employee_name}
            onChange={handleInput}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="outlined-basic"
            label="Salary"
            type="number"
            variant="outlined"
            name="employee_salary"
            onChange={handleInput}
            value={userDetails.employee_salary}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="outlined-basic"
            label="Age"
            type="number"
            variant="outlined"
            name="employee_age"
            value={userDetails.employee_age}
            onChange={handleInput}
          />
        </Box>

        <DialogActions>
          <Button onClick={handleClickOpen} variant="outlined">
            Cancel
          </Button>
          <Button onClick={handleAddEmployee} variant="contained">
            {isPending ? "Adding..." : ""}
            {editEnable ? "Edit" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
