import {createSlice, createEntityAdapter, createAsyncThunk} from '@reduxjs/toolkit'
import { headers } from '../todos/todosSlice'

const filtersAdapter = createEntityAdapter()

const initialState = filtersAdapter.getInitialState({
    status: 'idle'
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
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchColors.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchColors.fulfilled, (state, action) => {
                console.log('action2: ', action)
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