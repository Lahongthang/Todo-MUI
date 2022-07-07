import {configureStore} from '@reduxjs/toolkit'
import filtersSlice from './features/filters/filtersSlice'
import todosSlice from './features/todos/todosSlice'

const store = configureStore({
    reducer: {
        todos: todosSlice,
        filters: filtersSlice
    }
})

export default store