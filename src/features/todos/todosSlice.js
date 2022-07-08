import {createSlice, createEntityAdapter, createAsyncThunk} from '@reduxjs/toolkit'

export const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Accept': 'application/json'
}

const todosAdapter = createEntityAdapter()

const initialState = todosAdapter.getInitialState({
    status: 'idle',
    links: {},
    meta: {}
})

export const fetchTodos = createAsyncThunk(
    'todos/fetchTodos',
    async ({colors, status}, {rejectWithValue, fulfillWithValue}) => {
        const response = await fetch('http://localhost:8000/api/todos', {headers})
        const data = await response.json()
        if (!response.ok) {
            return rejectWithValue(data)
        }
        return fulfillWithValue(data)
    }
)

const todosSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchTodos.pending, (state, action) => {
                state.status = 'pending'
            })
            .addCase(fetchTodos.fulfilled, (state, action) => {
                state.status = 'idle'
                state.links = action.payload.links
                state.meta = action.payload.meta
                todosAdapter.setAll(state, action.payload.data)
            })
            .addCase(fetchTodos.rejected, (state, action) => {
                state.status = 'failed'
            })
    }
})

export default todosSlice.reducer

export const {
    selectAll: selectAllTodos,
    selectIds: selectTodoIds,
    selectById: selectTodoById,
    selectEntities
} = todosAdapter.getSelectors(state => state.todos)