import { useState } from "react"
import { Box, TextField } from "@mui/material"

const Header = () => {
    const [text, setText] = useState('')
    const handleChange = e => {
        setText(e.target.value)
    }

    const handleKeyDown = e => {
        if (e.which === 13 && text) {
            console.log('new todo: ', text)
            setText('')
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