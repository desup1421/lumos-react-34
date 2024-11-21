import React, { useState, useEffect } from "react";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import { useSelector, useDispatch } from "react-redux";
import { toggleLang } from "./redux/slices/langSlice";
import { toggleTheme } from "./redux/slices/themeSlice";


const App = () => {
  const dispatch = useDispatch();
  const lang = useSelector((state) => state.lang.lang);
  const theme = useSelector((state) => state.theme.theme);

  useEffect(() => {
    document.documentElement.setAttribute("data-bs-theme", theme);
  }, [theme]);

  return (
    <div className="container mt-5">
      <div className="btn-group mb-3">
        <button 
          onClick={() => dispatch(toggleLang())}
          className="btn btn-outline-primary"
        >
          {lang === "en" ? "Indonesia" : "English"}
        </button>
        <button 
          onClick={() => dispatch(toggleTheme())}
          className="btn btn-outline-primary"
        >
          {theme === "light" ? "Dark" : "Light"}
        </button>
      </div>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-body">
              <h1 className="card-title text-center mb-4">{lang === "en" ? "To-Do List" : "Daftar To-Do"}</h1>
              <TodoInput />
              <TodoList />
            </div>
          </div>
        </div>
      </div> 
    </div>
  );
};

export default App;
