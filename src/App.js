import { useSelector } from "react-redux";
import { Routes, Route, MemoryRouter, BrowserRouter } from "react-router-dom";
import Header from "./components/header/Header";
import TodoList from "./components/body/TodoList";
import TodoPagination from "./components/body/TodoPagination";
import Footer from "./components/footer/Footer";
import Divider from "@mui/material/Divider";

import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import { createTheme, ThemeProvider } from "@mui/material";

const customizeTheme = createTheme({
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: "#f5f5f5",
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
    MuiListItem: {
      styleOverrides: {
        root: {
          backgroundColor: "",
        },
      },
    },
  },
});

function App() {
  const totalTodos = useSelector(state => state.todos.meta.total)

  return (
    <ThemeProvider theme={customizeTheme}>
      <Container>
        <Paper elevation={0}>
          <Header />
          <TodoList />
          {(totalTodos > 5) && <TodoPagination />}
          <Divider />
          <Footer />
        </Paper>
      </Container>
    </ThemeProvider>
  );
}

export default App;
