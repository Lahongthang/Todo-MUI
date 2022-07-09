import {createSlice, createEntityAdapter, createAsyncThunk} from '@reduxjs/toolkit'
import { encode } from '../tools/encode'

export const baseUrl = 'http://localhost:8000/api/'

export const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Accept': 'application/json'
}

const todosAdapter = createEntityAdapter()

const initialState = todosAdapter.getInitialState({
    status: 'idle',
    message: '',
    links: {},
    meta: {}
})

export const fetchTodos = createAsyncThunk(
    'todos/fetchTodos',
    async ({colors, status}, {rejectWithValue, fulfillWithValue}) => {
        const url = baseUrl + 'todos?sortBy=dateDesc'
        const response = await fetch(url, {headers})
        const data = await response.json()
        if (!response.ok) {
            return rejectWithValue(data)
        }
        return fulfillWithValue(data)
    }
)

export const addTodo = createAsyncThunk(
    'todos/addTodo',
    async (text, {rejectWithValue, fulfillWithValue}) => {
        const url = baseUrl + `todos`
        const response = await fetch(url, {
            method: 'POST',
            headers,
            body: encode({text: text})
        })
        const data = await response.json()
        if (!response.ok) {
            return rejectWithValue(data)
        }
        return fulfillWithValue(data)
    }
)

export const deleteTodo = createAsyncThunk(
    'todos/deleteTodo',
    async (id, {rejectWithValue, fulfillWithValue}) => {
        const url = baseUrl + `todos/${id}`
        const response = await fetch(url, {
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

            .addCase(addTodo.fulfilled, (state, action) => {
                state.message = '1 todo added'
                todosAdapter.addOne(state, action.payload.data)
            })
            .addCase(addTodo.rejected, (state, action) => {
                state.message = 'add todo failed!'
            })

            .addCase(deleteTodo.fulfilled, (state, action) => {
                console.log('action: ', action)
                todosAdapter.removeOne(state, action.payload.data.id)
            })
            .addCase(deleteTodo.rejected, (state, action) => {
                console.log('action: ', action)
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