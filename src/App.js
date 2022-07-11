import {Routes, Route, MemoryRouter, BrowserRouter} from 'react-router-dom'
import Header from "./components/header/Header"
import TodoList from "./components/body/TodoList"
import TodoPagination from "./components/body/TodoPagination"
import Footer from "./components/footer/Footer"

import {Container, Box, Paper, Grid} from '@mui/material'
import Test from './components/body/Test'

function App() {
  return (
    <div className="App">
      <Container>
        <Paper
          elevation={0}
          sx={{
              background: '#f5f5f5',
              maxWidth: 922,
              marginX: 'auto',
              marginY: 10,
              overflow: 'hidden'
            }}
        >
          <Header/>
          <TodoList/>
          <TodoPagination/>
          <Footer/>
        </Paper>
      </Container>
    </div>
  );
}

export default App;
