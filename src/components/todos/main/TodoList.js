import { useSelector } from "react-redux";
import { selectTodoIds } from "../../../features/todos/todosSlice";
import TodoListItem from "./TodoListItem";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";
import Divider from "@mui/material/Divider";

const TodoList = () => {
  const todoIds = useSelector(selectTodoIds);
  const status = useSelector((state) => state.todos.status);

  return (
    <Box>
      <Typography
        variant="h4"
        component="p"
        marginY={5}
        sx={{ textAlign: "center" }}
      >
        Todo List
      </Typography>

      <Divider />
      <List sx={{ height: 300, overflow: "auto" }}>
        {status === "idle" ? (
          todoIds.map((id) => <TodoListItem key={id} id={id} />)
        ) : status === "loading" ? (
          <Backdrop
            sx={{ color: "blue", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={true}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        ) : (
          <Box textAlign={"center"}>
            <Typography variant="h4" component="h4">
              Todos Not Found!
            </Typography>
          </Box>
        )}
      </List>
    </Box>
  );
};

export default TodoList;