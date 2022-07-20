import { Routes, Route } from 'react-router-dom'
import Navbar from "./components/navbar/Navbar";
import Todos from "./components/todos/Todos";
import Colors from "./components/colors/ColorList";
import EditColor from './components/colors/EditColor';
import Container from "@mui/material/Container";
import Paper from '@mui/material/Paper';
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
  return (
    <ThemeProvider theme={customizeTheme}>
      <Navbar />
      <Container>
        <Paper elevation={5}>
          <Routes>
            <Route path='/' element={<Todos />} />
            <Route path='/colors' element={<Colors />} />
            <Route path='/colors/:id' element={<EditColor />} />
          </Routes>
        </Paper>
      </Container>
    </ThemeProvider>
  );
}

export default App;
