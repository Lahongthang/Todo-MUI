import { useState } from "react"
import { useSelector } from "react-redux"
import { selectTodoById } from "../../features/todos/todosSlice"

import { ListItem, ListItemText, IconButton, ListItemIcon, Checkbox, Box, Typography, Divider } from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete"
import EditIcon from '@mui/icons-material/Edit'

const TodoListItem = ({id}) => {
    const todo = useSelector(state => selectTodoById(state, id))
    console.log(todo)
    const [checked, setChecked] = useState(todo.completed)

    const handleCheck = () => {
        setChecked(!checked)
    }

    const handleEdit = () => {
        console.log('Edit')
    }

    const handleDelete = () => {
        console.log('Deleted')
    }

    return (
        <>
            <ListItem
                secondaryAction={
                    <Box>
                        <IconButton onClick={handleEdit} sx={{marginX: 3}}>
                            <EditIcon color="info"/>
                        </IconButton>
                        <IconButton onClick={handleDelete}>
                            <DeleteIcon sx={{color: '#111'}}/>
                        </IconButton>
                    </Box>
                    
                }
            >
                <ListItemIcon>
                    <Checkbox
                        color="success"
                        checked={checked}
                        onChange={handleCheck}
                    />
                </ListItemIcon>
                <ListItemText
                    primary={
                        <Typography variant="h6" component='h3'>
                            {todo.text}
                        </Typography>
                    }
                    sx={{marginLeft: 5}}
                />
            </ListItem>
            <Divider variant="inset" component='li'/>
        </>
    )
}

export default TodoListItem