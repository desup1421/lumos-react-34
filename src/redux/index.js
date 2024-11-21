import { configureStore } from '@reduxjs/toolkit';
import todoReducer from "./slices/todosSlice";
import langReducer from "./slices/langSlice";
import themeReducer from "./slices/themeSlice";

export const store = configureStore({
    reducer: {
        todos: todoReducer,
        lang: langReducer,
        theme: themeReducer
    }
});