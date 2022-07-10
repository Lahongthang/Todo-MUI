import TodoList from "./components/body/TodoList"
import Header from "./components/header/Header"
import Footer from "./components/footer/Footer"

import {Container, Box, Paper, Grid} from '@mui/material'

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
          <Footer/>
        </Paper>
      </Container>
    </div>
  );
}

export default App;
