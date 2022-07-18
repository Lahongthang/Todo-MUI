import { useSelector, useDispatch } from "react-redux";
import MarkAndClear from "./MarkAndClear";
import RemainingTodos from "./RemainingTodos";
import StatusFilter from "./StatusFilter";
import ColorFilter from "./ColorFilter";
import {
  selectAllTodos,
  selectTodoIds,
  fetchTodos,
  markOrClearAllCompleted,
  markAllComplete,
} from "../../features/todos/todosSlice";

import {
  statusFilterChanged,
  colorsFilterChanged,
} from "../../features/filters/filtersSlice";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

const Footer = () => {
  const dispatch = useDispatch();
  const todos = useSelector(selectAllTodos);
  const todoIds = useSelector(selectTodoIds);
  const todosRemaining = todos.filter((todo) => !todo.completed).length;
  const { statusFilter, colorsFilter } = useSelector((state) => state.filters);

  const onStatusChange = (status) => {
    dispatch(fetchTodos({ status }));
    dispatch(statusFilterChanged(status));
  };

  const onColorChange = (color, changeType) => {
    dispatch(colorsFilterChanged({ color, changeType }));
    const newColorsFilter =
      changeType === "added"
        ? colorsFilter.concat(color)
        : colorsFilter.filter((existingColor) => existingColor !== color);
    dispatch(fetchTodos({ colors: newColorsFilter }));
  };

  const handleMarkAllCompleted = () => {
    dispatch(markOrClearAllCompleted({ ids: todoIds, action: "mark" }));
    dispatch(markAllComplete());
  };

  const handleClearAllCompled = async () => {
    dispatch(markOrClearAllCompleted({ ids: todoIds, action: "clear" }));
    dispatch(fetchTodos({}));
    // dispatch(deleteAllCompleted())
  };

  return (
    <Box marginX={3} marginY={5} textAlign="center">
      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <MarkAndClear
            onMarkAllCompleted={handleMarkAllCompleted}
            onClearAllCompleted={handleClearAllCompled}
          />
        </Grid>

        <Grid item xs={12} md={2}>
          <RemainingTodos count={todosRemaining} />
        </Grid>

        <Grid item xs={12} md={2}>
          <StatusFilter value={statusFilter} onChange={onStatusChange} />
        </Grid>

        <Grid item xs={12} md={5}>
          <ColorFilter value={colorsFilter} onChange={onColorChange} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Footer;
