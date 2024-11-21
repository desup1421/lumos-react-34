import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteTodo, toggleTodo, currentTodo } from "../redux/slices/todosSlice";

const TodoList = () => {
  const dispatch = useDispatch();
  const { todos } = useSelector((state) => state.todos);
  const lang = useSelector((state) => state.lang.lang);

  if (todos.length === 0)
    return (
      <div className="alert alert-secondary text-center">{lang === "en" ? "To-Do isn't available yet" : "Belum ada To-Do"}</div>
  );

  const handleDelete = (e, id) => {
    e.stopPropagation();
    dispatch(deleteTodo(id));
  };  

  const handleEdit = (e, todo) => {
    e.stopPropagation();
    dispatch(currentTodo(todo));
  };

  return (
    <ul className="list-group">
      {todos.map((todo) => (
        <li
          key={todo.id}
          className={`list-group-item d-flex justify-content-between align-items-center ${
            todo.completed ? "list-group-item-success" : ""
          }`}
          onClick={() => dispatch(toggleTodo(todo.id))}
        >
          <span
            style={{
              cursor: "pointer",
              textDecoration: todo.completed ? "line-through" : "none",
            }}
          >
            {todo.text}
          </span>
          <div className="btn-group">
            <button
              onClick={(e)=> handleEdit(e, todo)}
              className="btn btn-warning btn-sm"
            >
              {lang === "en" ? "Edit" : "Sunting"}
            </button>
            <button
              onClick={(e)=> handleDelete(e, todo.id)}
              className="btn btn-danger btn-sm"
            >
              {lang === "en" ? "Delete" : "Hapus"}
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
