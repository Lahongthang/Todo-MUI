import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import {
    selectAllTodos,
    selectTodoIds,
    fetchTodos,
    markOrClearAllCompleted
} from "../../features/todos/todosSlice"

import {
    selectAllColors,
    StatusFilters,
    statusFilterChanged,
    colorsFilterChanged
} from "../../features/filters/filtersSlice"

import {
    Grid,
    Stack,
    Button,
    Box,
    Typography,
    ToggleButton,
    ToggleButtonGroup,
    FormGroup,
    FormControlLabel,
    Checkbox
} from "@mui/material"
import { blue } from "@mui/material/colors"

const RemainingTodos = ({count}) => {
    const suffix = count < 2 ? '' : 's'
    return (
        <Box>
            <Typography variant="subtitle2" component='p'>
                Remaining todos
            </Typography>
            <Typography variant="subtitle1" component='p'>
                {count} item{suffix} left
            </Typography>
        </Box>
    )
}

const StatusFilter = ({value: statusFilter, onChange}) => {
    const handleChange = (e) => {
        const newStatus = e.target.value
        onChange(newStatus)
    }

    const renderedFilters = Object.keys(StatusFilters).map(key => {
        const value = StatusFilters[key]
        return (
            <ToggleButton
                key={key}
                size="small"
                value={value}
                sx={{border: 'none'}}
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
                value={statusFilter}
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
        const checked = colorsFilter.includes(color.name)
        const handleChange = () => {
            const changeType = checked ? 'removed' : 'added'
            onChange(color.name, changeType)
        }
        return (
            <Grid item key={color.id} xs={3} md={6}>
                <FormGroup>
                    <FormControlLabel
                        control={
                            <>
                                <Checkbox checked={checked} onChange={handleChange}/>
                                <span style={{width: 28, height: 14, background: color.name, marginRight: 5}}/>
                            </>
                        }
                        label={color.name}
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
    const dispatch = useDispatch()
    const todos = useSelector(selectAllTodos)
    const todoIds = useSelector(selectTodoIds)
    const todosRemaining = todos.filter(todo => !todo.completed).length
    const {statusFilter, colorsFilter} = useSelector(state => state.filters)

    const onStatusChange = (status) => {
        dispatch(fetchTodos({status}))
        dispatch(statusFilterChanged(status))
    }

    const onColorChange = (color, changeType) => {
        dispatch(colorsFilterChanged({color, changeType}))
        const newColorsFilter = changeType === 'added' ?
            colorsFilter.concat(color) :
            colorsFilter.filter(existingColor => existingColor !== color)
        dispatch(fetchTodos({colors: newColorsFilter}))
    }

    const handleMarkAllCompleted = () => {
        dispatch(markOrClearAllCompleted({ids: todoIds, action: 'mark'}))
        dispatch(fetchTodos({}))
    }

    const handleClearAllCompled = async () => {
        dispatch(markOrClearAllCompleted({ids: todoIds, action: 'clear'}))
        dispatch(fetchTodos({}))
    }

    return (
        <Box marginX={3} marginY={5} textAlign='center'>
            <Grid container spacing={3}>
                <Grid item xs={12} md={3}>
                    <Stack spacing={2}>
                        <Button variant="contained" size='small' onClick={handleMarkAllCompleted}>
                            Mark All
                        </Button>
                        <Button variant="contained" size='small' onClick={handleClearAllCompled}>
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