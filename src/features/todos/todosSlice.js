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
    async ({colors, status, page}, {rejectWithValue, fulfillWithValue}) => {
        const statusParam = status ? `&status=${status}` : ''
        const colorsParam = colors ? `&colors=${colors}` : ''
        const pageParam = page ? `&page=${page}` : ''
        const url = baseUrl + 'todos?sortBy=dateDesc&pageSize=5' + statusParam + colorsParam + pageParam
        console.log('url: ', url)
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

export const updateTodo = createAsyncThunk(
    'todos/updateTodo',
    async ({id, completed, color}, {rejectWithValue, fulfillWithValue}) => {
        const body = {}
        if (completed !== undefined) Object.assign(body, {completed: !completed})
        if (color !== undefined) Object.assign(body, {color})
        const url = baseUrl + `todos/${id}`
        console.log('body: ', body)
        console.log('url: ', url)
        const response = await fetch(url, {
            method: 'PUT',
            headers,
            body: encode(body)
        })
        const data = await response.json()
        if (!response.ok) {
            return rejectWithValue(data)
        }
        return fulfillWithValue(data)
    }
)

export const markOrClearAllCompleted = createAsyncThunk(
    'todos/markOrClear',
    async ({ids, action}, {rejectWithValue, fulfillWithValue}) => {
        const url = action === 'mark' ?
            baseUrl + `todos/mark-completed?ids=${ids}` :
            baseUrl + `todos/clear-completed?ids=${ids}`
        const response = await fetch(url, {headers})
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
    reducers: {
        markAllComplete(state) {
            Object.values(state.entities).forEach(todo => {
                todo.completed = true
            })
        },
        deleteAllCompleted(state) {
            const newEntities = {}
            Object.values(state.entities).forEach(todo => {
                if (!todo.completed) {
                    newEntities[todo.id] = todo
                }
            })
            state.entities = newEntities
        }
    },
    extraReducers: builder => {
        builder
            .addCase(fetchTodos.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(fetchTodos.fulfilled, (state, action) => {
                console.log(action)
                state.status = 'idle'
                state.links = action.payload.links
                state.meta = action.payload.meta
                todosAdapter.setAll(state, action.payload.data)
            })
            .addCase(fetchTodos.rejected, (state) => {
                state.status = 'failed'
            })

            .addCase(addTodo.fulfilled, (state, action) => {
                state.message = '1 todo added'
                todosAdapter.addOne(state, action.payload.data)
            })
            .addCase(addTodo.rejected, (state) => {
                state.message = 'add todo failed!'
            })

            .addCase(deleteTodo.fulfilled, (state, action) => {
                state.message = '1 todo deleted'
                todosAdapter.removeOne(state, action.payload.data.id)
            })
            .addCase(deleteTodo.rejected, (state) => {
                state.message = 'delete todo failed!'
            })

            .addCase(updateTodo.fulfilled, (state, action) => {
                state.message = 'update todo succeed!'
                todosAdapter.upsertOne(state, action.payload.data)
            })
            .addCase(updateTodo.rejected, (state) => {
                state.message = 'update todo failed!'
            })

            .addCase(markOrClearAllCompleted.fulfilled, (state, action) => {
                state.message = action.payload.message
            })
            .addCase(markOrClearAllCompleted.rejected, (state, action) => {
                state.message = action.payload.message
            })
    }
})

export default todosSlice.reducer

export const {
    selectAll: selectAllTodos,
    selectIds: selectTodoIds,
    selectById: selectTodoById,
    selectTotal: selectTotalTodos,
    selectEntities
} = todosAdapter.getSelectors(state => state.todos)

export const {markAllComplete, deleteAllCompleted} = todosSlice.actions