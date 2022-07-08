import { useSelector } from "react-redux"
import { selectAllTodos } from "../../features/todos/todosSlice"
import { StatusFilters } from "../../features/filters/filtersSlice"
import { Grid, Stack, Button, Box, Typography } from "@mui/material"

const RemainingTodos = ({count}) => {
    const suffix = count < 2 ? '' : 's'
    return (
        <Box>
            <Typography variant="subtitle2" component='p'>
                Remaining todos
            </Typography>
            <Typography variant="" component='p'>
                {count} item{suffix} left
            </Typography>
        </Box>
    )
}

const StatusFilter = () => {

    return (
        <></>
    )
}

const ColorFilter = () => {
    
    return (
        <></>
    )
}

const Footer = () => {
    const todos = useSelector(selectAllTodos)
    const todosRemaining = todos.filter(todo => !todo.completed).length

    return (
        <Box marginX={3} marginY={5}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={3}>
                    <Stack spacing={2}>
                        <Button variant="contained" size='small'>
                            Mark All
                        </Button>
                        <Button variant="contained" size='small'>
                            Delete Completed
                        </Button>
                    </Stack>
                </Grid>

                <Grid item xs={12} md={2}>
                    <RemainingTodos count={todosRemaining}/>
                </Grid>

                <Grid item xs={12} md={3}>
                    <StatusFilter/>
                </Grid>

                <Grid item xs={12} md={4}>
                    <ColorFilter/>
                </Grid>
            </Grid>
        </Box>
    )
}

export default Footer