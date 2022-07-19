import { useSelector } from "react-redux";
import { selectTodoIds } from "./features/todos/todosSlice";
import Navbar from "./components/navbar/Navbar";
import Header from "./components/body/header/Header";
import TodoList from "./components/body/main/TodoList";
import TodoPagination from "./components/body/main/TodoPagination";
import Footer from "./components/body/footer/Footer";
import Divider from "@mui/material/Divider";

import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import { createTheme, ThemeProvider } from "@mui/material";

const customizeTheme = createTheme({
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          maxWidth: "922px",
          margin: "auto",
          overflow: "hidden",
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          margin: "auto",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
    },
  },
});

function App() {
  const totalTodos = useSelector((state) => state.todos.meta.total);
  const todoIds = useSelector(selectTodoIds);

  return (
    <ThemeProvider theme={customizeTheme}>
      <Navbar />
      <Container>
        <Paper elevation={5}>
          <Header />
          <TodoList />
          {totalTodos > 5 && todoIds.length > 0 && <TodoPagination />}
          <Divider />
          <Footer />
        </Paper>
      </Container>
    </ThemeProvider>
  );
}

export default App;
