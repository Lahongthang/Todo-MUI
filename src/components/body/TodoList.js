import {useSelector} from 'react-redux'
import { selectTodoIds } from '../../features/todos/todosSlice'
import ListItem from './ListItem'

const TodoList = () => {
    const todoIds = useSelector(selectTodoIds)
    console.log('ids: ', todoIds)

    return (
        <ul>
            {todoIds.map(todoId => (
                <ListItem key={todoId} id={todoId}/>
            ))}
        </ul>
    )
}

export default TodoList