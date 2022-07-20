import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateTodo } from "../../../features/todos/todosSlice";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import InputForm from "../header/InputForm";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Switch from "@mui/material/Switch";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  minWidth: 300,
  maxWidth: 600,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 3,
  p: 4,
};

const EditTodoModal = ({ todo, open, onClose }) => {
  const dispatch = useDispatch();
  const [text, setText] = useState(todo.text);
  const [checked, setChecked] = useState(todo.completed);
  const [color, setColor] = useState(todo.color?.name)

  const handleClose = () => {
    setText(todo.text);
    setChecked(todo.completed);
    onClose();
  };

  const handleSave = () => {
    dispatch(updateTodo({ id: todo.id, completed: !checked, text: text }));
    onClose()
  };

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleCheckedChange = (e) => {
    setChecked(e.target.checked);
  };

  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <InputForm
            placeholder="Enter new todo..."
            label="Edit todo"
            value={text}
            onChange={handleTextChange}
          />

          <Grid container spacing={3}>
            <Grid item xs={6}>
              <Switch checked={checked} onChange={handleCheckedChange} />
            </Grid>
            <Grid item xs={6}></Grid>
          </Grid>

          <Stack spacing={2} direction="row" m={3} sx={{ float: "right" }}>
            <Button variant="contained" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="contained" onClick={handleSave}>
              Save
            </Button>
          </Stack>
        </Box>
      </Modal>
    </>
  );
};

export default EditTodoModal;
