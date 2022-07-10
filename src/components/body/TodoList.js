import {useSelector} from 'react-redux'
import { selectTodoIds, selectAllTodos, selectEntities } from '../../features/todos/todosSlice'
import TodoListItem from './TodoListItem'

import { Box, Typography, List, CircularProgress, Backdrop } from '@mui/material'

const TodoList = () => {
    const todoIds = useSelector(selectTodoIds)
    const status = useSelector(state => state.todos.status)

    return (
        <Box>
            <Typography
                variant='h4'
                component='div'
                sx={{textAlign: 'center'}}
            >
                Todos
            </Typography>
            <List>
                {/* {todoIds.map(id => (
                    <TodoListItem key={id} id={id}/>
                ))} */}
                {status === 'idle' ? (
                    todoIds.map(id => (
                        <TodoListItem key={id} id={id}/>
                    ))
                ) : status === 'loading' ? (
                    <Backdrop
                        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                        open={true}
                    >
                        <CircularProgress color="inherit" />
                    </Backdrop>
                ) : (
                    <Box textAlign={'center'}>
                        <Typography variant='h4' component='h4'>Todos Not Found!</Typography>
                    </Box>
                )}
            </List>
        </Box>
    )
}

export default TodoList