import {createSlice, createEntityAdapter, createAsyncThunk} from '@reduxjs/toolkit'
import { headers } from '../todos/todosSlice'

export const StatusFilters = {
    All: 'all',
    Active: 'active',
    Completed: 'completed'
}

const filtersAdapter = createEntityAdapter()

const initialState = filtersAdapter.getInitialState({
    status: 'idle',
    statusFilter: StatusFilters.All,
    colorsFilter: []
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