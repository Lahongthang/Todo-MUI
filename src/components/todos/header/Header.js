import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo, fetchTodos } from "../../../features/todos/todosSlice";
import InputForm from "./InputForm";

const Header = () => {
  const dispatch = useDispatch();
  const [text, setText] = useState("");
  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.which === 13 && text) {
      setText("");
      dispatch(addTodo(e.target.value));
      dispatch(fetchTodos({}));
    }
  };

  return (
    <InputForm
      placeholder="What's need to be done?"
      label="Add todo here"
      value={text}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      autoFocus={false}
    />
  );
};

export default Header;
