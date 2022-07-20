import {createSlice, createEntityAdapter, createAsyncThunk} from '@reduxjs/toolkit'
import { headers } from '../todos/todosSlice'
import { encode, capitalize } from '../tools/tools'

export const StatusFilters = {
    All: 'all',
    Active: 'active',
    Completed: 'completed'
}

const filtersAdapter = createEntityAdapter()

const initialState = filtersAdapter.getInitialState({
    status: 'idle',
    statusFilter: StatusFilters.All,
    colorsFilter: [],
    message: ''
})

export const fetchColors = createAsyncThunk(
    'colors/fetchColors',
    async ({}, {rejectWithValue, fulfillWithValue}) => {
        const response = await fetch('http://localhost:8000/api/colors', {headers})
        const data = await response.json()
        if (!response.ok) {
            return rejectWithValue(data)
        }
        return fulfillWithValue(data)
    }
)

export const addColor = createAsyncThunk(
    'colors/addColor',
    async (name, {rejectWithValue, fulfillWithValue}) => {
        const response = await fetch('http://localhost:8000/api/colors', {
            method: 'POST',
            headers,
            body: encode({name: capitalize(name)})
        })
        const data = await response.json()
        if (!response.ok) {
            return rejectWithValue(data)
        }
        return fulfillWithValue(data)
    }
)

export const deleteColor = createAsyncThunk(
    'colors/deleteColor',
    async (id, {rejectWithValue, fulfillWithValue}) => {
        const response = await fetch(`http://localhost:8000/api/colors/${id}`, {
            method: 'DELETE',
            headers
        })
        const data = await response.json()
        if (!response.ok) {
            return rejectWithValue(data)
        }
        return fulfillWithValue(data)
    }
)

export const editColor = createAsyncThunk(
    'colors/editColor',
    async ({id, text}, {rejectWithValue, fulfillWithValue}) => {
        const response = await fetch(`http://localhost:8000/api/colors/${id}`, {
            method: 'PUT',
            headers,
            body: encode({name: capitalize(text)})
        })
        const data = await response.json()
        if (!response.ok) {
            return rejectWithValue(data)
        }
        return fulfillWithValue(data)
    }
)

const filtersSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        statusFilterChanged (state, action) {
            state.statusFilter = action.payload
        },
        colorsFilterChanged (state, action) {
            const {color, changeType} = action.payload
            const {colorsFilter} = state
            switch (changeType) {
                case 'added': {
                    if (!colorsFilter.includes(color)) {
                        state.colorsFilter.push(color)
                    }
                }
                break
                case 'removed': {
                    state.colorsFilter = state.colorsFilter.filter(existingColor => existingColor !== color)
                }
                break
                default:
                    return state
            }
        }
    },
    extraReducers: builder => {
        builder
            .addCase(fetchColors.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchColors.fulfilled, (state, action) => {
                state.status = 'idle'
                filtersAdapter.setAll(state, action.payload.data)
            })
            .addCase(fetchColors.rejected, (state, action) => {
                state.status = 'failed'
            })

            .addCase(addColor.fulfilled, (state, action) => {
                state.message = '1 color added!'
                filtersAdapter.addOne(state, action.payload.data)
            })
            .addCase(addColor.rejected, (state) => {
                state.message = 'add color failed!'
            })

            .addCase(deleteColor.fulfilled, (state, action) => {
                state.message = '1 color deleted!'
                filtersAdapter.removeOne(state, action.payload.data.id)
            })
            .addCase(deleteColor.rejected, (state) => {
                state.message = 'delete color failed!'
            })

            .addCase(editColor.fulfilled, (state, action) => {
                state.message = 'edit color succeed!'
                filtersAdapter.upsertOne(state, action.payload.data)
            })
            .addCase(editColor.rejected, (state) => {
                state.message = 'edit color failed!'
            })
    }
})

export default filtersSlice.reducer

export const {
    selectAll: selectAllColors,
    selectIds: selectColorIds,
    selectById: selectColorById,
    selectEntities
} = filtersAdapter.getSelectors(state => state.filters)

export const {statusFilterChanged, colorsFilterChanged} = filtersSlice.actions