import {useSelector} from 'react-redux'
import { selectTodoIds, selectAllTodos, selectEntities } from '../../features/todos/todosSlice'
import TodoListItem from './TodoListItem'

import { Box, Typography, List } from '@mui/material'

const TodoList = () => {
    const todoIds = useSelector(selectTodoIds)
    const meta = useSelector(state => state.todos.meta)
    console.log('meta: ', meta)

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
                {todoIds.map(id => (
                    <TodoListItem key={id} id={id}/>
                ))}
            </List>
        </Box>
    )
}

export default TodoList