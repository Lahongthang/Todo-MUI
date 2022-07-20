import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectTodoById,
  deleteTodo,
  updateTodo,
} from "../../../features/todos/todosSlice";
import { selectAllColors } from "../../../features/filters/filtersSlice";
import EditTodoModal from "./EditTodoModal";

import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const TodoListItem = ({ id }) => {
  const dispatch = useDispatch();
  const todo = useSelector((state) => selectTodoById(state, id));
  const todoColor = todo.color ? todo.color.name : "";
  const apiColors = useSelector(selectAllColors);

  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleClick = () => {
    console.log("Edit");
    setOpen(true);
  };

  const handleStatusChange = () => {
    dispatch(updateTodo({ id, completed: todo.completed }));
  };

  const handleDelete = () => {
    console.log("Deleted");
    dispatch(deleteTodo(id));
  };

  const handleColorChange = (e) => {
    const newColor = e.target.value;
    dispatch(updateTodo({ id, color: newColor }));
  };

  const renderedMenuItem = apiColors.map((color) => (
    <MenuItem key={color.id} value={color.name} sx={{ color: color.name }}>
      {color.name}
    </MenuItem>
  ));

  return (
    <>
      <ListItem
        secondaryAction={
          <IconButton onClick={handleDelete}>
            <DeleteIcon sx={{ color: "#111" }} />
          </IconButton>
        }
        sx={{ ":hover": { backgroundColor: "#e0e0e0" } }}
      >
        <ListItemIcon>
          <Checkbox
            color="success"
            checked={todo.completed}
            onChange={handleStatusChange}
          />
        </ListItemIcon>

        <ListItemText
          primary={
            <Typography variant="h6" component="h3">
              {todo.text}
            </Typography>
          }
          sx={{ marginLeft: 5 }}
        />

        <FormControl size="small" sx={{ width: "120px" }}>
          <InputLabel id={`todo${id}-color`}>Color</InputLabel>
          <Select
            labelId={`todo${id}-color`}
            id={`todo${id}-color`}
            label="Color"
            value={todoColor}
            onChange={handleColorChange}
            sx={{ color: todoColor }}
          >
            {renderedMenuItem}
          </Select>
        </FormControl>

        <IconButton edge="end" onClick={handleClick} sx={{ marginX: 5 }}>
          <EditIcon color="primary" />
        </IconButton>
        <EditTodoModal
          todo={todo}
          open={open}
          onClose={handleClose}
        />
      </ListItem>
    </>
  );
};

export default TodoListItem;
