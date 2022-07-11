import {useSelector} from 'react-redux'
import {useParams} from 'react-router-dom'
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
                marginY={5}
                sx={{textAlign: 'center'}}
            >
                Todos
            </Typography>
            <List sx={{height: 350, overflow: 'auto'}}>
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