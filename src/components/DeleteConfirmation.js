import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Delete } from "@mui/icons-material";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function BasicModal({
  showModal,
  handleShowModal,
  selectedValue,
  executeFetch,
}) {
  console.log("id", selectedValue);
  const handleDelete = async (event) => {
    event.preventDefault();
    const res = await fetch(
      `http://localhost:4000/employees/${selectedValue?.id}`,
      {
        method: "DELETE",
      }
    );
    if (Object.keys(res).length === 0) {
      handleShowModal(event, null);
    }
    executeFetch();
  };

  return (
    <div>
      <Button
        variant="outlined"
        color="error"
        startIcon={<Delete />}
        onClick={handleShowModal}
      >
        Delete
      </Button>
      <Modal
        open={showModal}
        onClose={handleShowModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            textAlign={"center"}
          >
            Are you sure u want to Delete ?{" "}
          </Typography>
          <Typography
            id="modal-modal-title"
            variant="subtitle1"
            component="h6"
            sx={{
              color: "blue",
              fontSize: 20,
              fontWeight: 500,
              textAlign: "center",
            }}
          >
            {selectedValue?.employee_name}
          </Typography>
          <Typography
            id="modal-modal-description"
            sx={{ mt: 2, display: "flex", justifyContent: "center", gap: 2 }}
          >
            <Button variant="contained" onClick={handleDelete}>
              Yes
            </Button>
            <Button variant="outlined" onClick={handleShowModal}>
              No
            </Button>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
