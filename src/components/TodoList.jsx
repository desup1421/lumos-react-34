import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { deleteTodo, toggleTodo, currentTodo } from "../redux/slices/todosSlice";
import { fetchTodos, currentTodo, deleteTodo, toggleTodo } from "../redux/async/todosSlice";

const TodoList = () => {
  const dispatch = useDispatch();
  const { todos, loading, error, isSuccess } = useSelector((state) => state.todos);
  const lang = useSelector((state) => state.lang.lang);

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  useEffect(() => {
    if(isSuccess) {
      dispatch(fetchTodos())
    }
  }, [isSuccess])

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
    dispatch(currentTodo(todo.id));
  };

  if (loading) return <div className="alert alert-secondary text-center">Loading...</div>;
  if (error) return <div className="alert alert-danger text-center">{error}</div>;

  return (
    <ul className="list-group">
      {todos.map((todo) => (
        <li
          key={todo.id}
          className={`list-group-item d-flex justify-content-between align-items-center ${
            todo.completed ? "list-group-item-success" : ""
          }`}
          onClick={() => dispatch(toggleTodo(todo))}
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
              onClick={(e) => handleEdit(e, todo)}
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
