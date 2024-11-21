// src/components/TodoInput.js
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTodo, updateTodo } from "../redux/slices/todosSlice";
import { v4 as uuidv4 } from "uuid";

const TodoInput = () => {
  const dispatch = useDispatch();
  const [text, setText] = useState("");
  const { isUpdate, todo } = useSelector((state) => state.todos);
  const lang = useSelector((state) => state.lang.lang);

  useEffect(()=> {
    if(todo?.id){
      setText(todo.text);
    }
  }, [todo])

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim() !== "") {
      if (isUpdate) {
        dispatch(updateTodo({
          ...todo,
          text
        }));
        setText("");
        return;
      } else {
        dispatch(addTodo({ 
          id: uuidv4(), 
          text,
          completed: false
        }));
      }
      setText("");
    }
  };

  return (
    <div className="mb-3">
      <form onSubmit={ handleSubmit } className="input-group">
        <input
          type="text"
          className="form-control"
          placeholder={lang === 'en' ? "Add a new task..." : "Tambahkan tugas baru..."}
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        />
        <button type="submit" className={`btn ${isUpdate ? "btn-warning" : "btn-primary"}`}>
          {isUpdate ? lang === "en" ? "Update" : "Perbarui" : lang === "en" ? "Add" : "Tambah"}
        </button>
      </form>
    </div>
  );
};

export default TodoInput;
