import { useState } from "react"
import { useDispatch } from "react-redux"
import { addTodo, fetchTodos } from "../../features/todos/todosSlice"
import { Box, TextField } from "@mui/material"

const Header = () => {
    const dispatch = useDispatch()
    const [text, setText] = useState('')
    const handleChange = e => {
        setText(e.target.value)
    }

    const handleKeyDown = e => {
        if (e.which === 13 && text) {
            setText('')
            dispatch(addTodo(e.target.value))
            dispatch(fetchTodos({}))
        }
    }

    return (
        <Box marginBottom={3}>
            <TextField
                variant="filled"
                placeholder="What's need to be done?"
                fullWidth
                color="info"
                label='Add todo here'
                value={text}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                autoComplete='off'
            />
        </Box>
    )
}

export default Header