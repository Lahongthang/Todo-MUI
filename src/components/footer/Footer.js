import { useState } from "react"
import { useSelector } from "react-redux"
import { selectAllTodos } from "../../features/todos/todosSlice"
import { selectAllColors, StatusFilters } from "../../features/filters/filtersSlice"
import { Grid, Stack, Button, Box, Typography, ToggleButton, ToggleButtonGroup, FormGroup, FormControlLabel, Checkbox } from "@mui/material"

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

const StatusFilter = ({value: statusFilter, onChange}) => {
    const [alignment, setAlignment] = useState(statusFilter)
    const handleChange = (e) => {
        setAlignment(e.target.value)
    }

    const renderedFilters = Object.keys(StatusFilters).map(key => {
        const value = StatusFilters[key]
        const handleClick = () => onChange(value)
        return (
            <ToggleButton
                key={key}
                size="small"
                value={value}
                sx={{border: 'none'}}
                onClick={handleClick}
            >
                {key}
            </ToggleButton>
        )
    })

    return (
        <Box>
            <Typography variant="subtitle2" component='p'>
                Filter by Status
            </Typography>
            <ToggleButtonGroup
                orientation="vertical"
                value={alignment}
                exclusive
                onChange={handleChange}
            >
                {renderedFilters}
            </ToggleButtonGroup>

        </Box>
    )
}

const ColorFilter = ({value: colorsFilter, onChange}) => {
    const apiColors = useSelector(selectAllColors)
    const renderedFilters = apiColors.map(color => {
        const handleChange = onChange(color)
        return (
            <Grid key={color.id} item xs={3} md={6}>
                <FormGroup>
                    <FormControlLabel
                        control={<Checkbox/>}
                        label={color.name}
                        onChange={handleChange}
                    />
                </FormGroup>
            </Grid>
        )
    })

    return (
        <Box>
            <Typography variant="subtitle2" component='p'>
                Filter by Colors
            </Typography>
            <Grid container textAlign='left'>
                {renderedFilters}
            </Grid>
        </Box>
    )
}

const Footer = () => {
    const todos = useSelector(selectAllTodos)
    const todosRemaining = todos.filter(todo => !todo.completed).length
    const {statusFilter, colorsFilter} = useSelector(state => state.filters)

    const onStatusChange = () => {

    }

    const onColorChange = () => {
        
    }

    return (
        <Box marginX={3} marginY={5} textAlign='center'>
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

                <Grid item xs={12} md={2}>
                    <StatusFilter value={statusFilter} onChange={onStatusChange}/>
                </Grid>

                <Grid item xs={12} md={5}>
                    <ColorFilter value={colorsFilter} onChange={onColorChange}/>
                </Grid>
            </Grid>
        </Box>
    )
}

export default Footer