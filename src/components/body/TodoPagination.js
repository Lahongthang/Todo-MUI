import {Link, useLocation} from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux"
import { fetchTodos } from "../../features/todos/todosSlice"
import { Pagination, PaginationItem } from "@mui/material"

const TodoPagination = () => {
    const dispatch = useDispatch()
    const location = useLocation()
    const query = new URLSearchParams(location.search)
    const page = parseInt(query.get('page') || '1', 10)

    const {statusFilter, colorsFilter} = useSelector(state => state.filters)
    console.log('status: ', statusFilter)

    const totolTodos = useSelector(state => state.todos.meta.links)
    const count = totolTodos.length - 2
    

    const handleClick = (page) => {
        dispatch(fetchTodos({page, status: statusFilter, colors: colorsFilter}))
    }

    return (
        <Pagination
            page={page}
            count={count}
            boundaryCount={2}
            renderItem={(item) => (
                <PaginationItem
                    component={Link}
                    to={`/${item.page === 1 ? '' : `?page=${item.page}`}`}
                    {...item}
                    onClick={() => handleClick(item.page)}
                />
            )}
        />
    )
}

export default TodoPagination