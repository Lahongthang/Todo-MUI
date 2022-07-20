import { useDispatch, useSelector } from "react-redux";
import { fetchTodos } from "../../../features/todos/todosSlice";
import { Pagination } from "@mui/material";

const TodoPagination = () => {
  const dispatch = useDispatch();
  const { statusFilter, colorsFilter } = useSelector((state) => state.filters);
  const totalTodos = useSelector((state) => state.todos.meta.links);
  const count = totalTodos.length - 2;
  const currentPage = useSelector((state) => state.todos.meta.current_page);

  const handleChange = (event, value) => {
    if (currentPage === value) return;
    dispatch(
      fetchTodos({ page: value, status: statusFilter, colors: colorsFilter })
    );
  };

  return (
    <Pagination
      sx={{ display: "flex", justifyContent: "center", mb: 3 }}
      variant='outlined'
      color="primary"
      count={count}
      boundaryCount={2}
      page={currentPage}
      onChange={handleChange}
    />
  );
};

export default TodoPagination;
