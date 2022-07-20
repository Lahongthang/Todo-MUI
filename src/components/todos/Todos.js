import { useSelector } from "react-redux";
import { selectTodoIds } from "../../features/todos/todosSlice";
import Header from "./header/Header";
import TodoList from "./main/TodoList";
import TodoPagination from "./main/TodoPagination";
import Footer from "./footer/Footer";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";

const Todos = () => {
  const totalTodos = useSelector((state) => state.todos.meta.total);
  const todoIds = useSelector(selectTodoIds);
  return (
    <>
      <Header />
      <TodoList />
      {totalTodos > 5 && todoIds.length > 0 && <TodoPagination />}
      <Divider />
      <Footer />
    </>
  );
};

export default Todos;
