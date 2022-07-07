import { useSelector } from "react-redux"
import { selectTodoById } from "../../features/todos/todosSlice"

const ListItem = ({id}) => {
    const todo = useSelector(state => selectTodoById(state, id))
    console.log('id: ', todo)

    return (
        <li>
            {todo.text}
        </li>
    )
}

export default ListItem