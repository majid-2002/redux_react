import { useSelector, useDispatch } from "react-redux";
import {
  toggleComplete,
  deleteTodo,
  addTodo,
} from "../features/todos/todoSlice";
import { useState } from "react";

const TodoList = () => {
  const [newTodoTitle, setNewTodoTitle] = useState("");
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos.todos);

  const handleAddTodo = () => {
    if (newTodoTitle.trim()) {
      dispatch(addTodo(newTodoTitle));
      setNewTodoTitle("");
    }
  };

  const handleToggleComplete = (todoId) => {
    dispatch(toggleComplete(todoId));
  };

  const handleDeleteTodo = (todoId) => {
    dispatch(deleteTodo(todoId));
  };

  return (
    <div>
      <h2>Todo List</h2>
      <input
        type="text"
        value={newTodoTitle}
        onChange={(e) => setNewTodoTitle(e.target.value)}
        placeholder="Add a new todo..."
        style={{ marginRight: "10px" }}
      />
      <button onClick={handleAddTodo}>Add Todo</button>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => handleToggleComplete(todo.id)}
            />
            <span
              style={{
                textDecoration: todo.completed ? "line-through" : "none",
                color: todo.completed ? "gray" : "black",
              }}
            >
              {todo.text}
            </span>
            <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
