import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectTodoIds, fetchTodos } from "../../features/todos/todosSlice";
import Header from "./header/Header";
import TodoList from "./main/TodoList";
import TodoPagination from "./main/TodoPagination";
import Footer from "./footer/Footer";
import Divider from "@mui/material/Divider";

const Todos = () => {
  const dispatch = useDispatch()
  const todoIds = useSelector(selectTodoIds);
  const { statusFilter, colorsFilter } = useSelector((state) => state.filters);
  const currentPage = useSelector((state) => state.todos.meta.current_page);
  const totalTodos = useSelector((state) => state.todos.meta.total);

  useEffect(() => {
    if (todoIds.length === 0) {
      dispatch(
        fetchTodos({
          page: currentPage - 1,
          status: statusFilter,
          colors: colorsFilter,
        })
      );
    }
  }, [todoIds.length])


  return (
    <>
      <Header />
      <TodoList />
      {totalTodos > 5 && <TodoPagination />}
      <Divider />
      <Footer />
    </>
  );
};

export default Todos;
