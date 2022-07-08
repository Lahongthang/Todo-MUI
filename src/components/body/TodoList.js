import {useSelector} from 'react-redux'
import { selectTodoIds } from '../../features/todos/todosSlice'
import TodoListItem from './TodoListItem'

import { Box, Grid, Typography, List, Divider } from '@mui/material'

const TodoList = () => {
    const todoIds = useSelector(selectTodoIds)

    return (
        <Box>
            <Typography variant='h4' component='div' sx={{textAlign: 'center'}}>
                Todos
            </Typography>
            <List>
                {todoIds.map(id => (
                    <TodoListItem key={id} id={id}/>
                ))}
            </List>
        </Box>
    )
}

export default TodoList