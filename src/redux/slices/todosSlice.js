import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  todos: [
		{
			id: 1,
			text: "Learn React",
			completed: false,
		},
		{
			id: 2,
			text: "Learn Redux",
			completed: false,
		},
	],
	todo: {},
	isUpdate: false,
};

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.todos.push(action.payload);
    },
    deleteTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
		toggleTodo: (state, action) => {
      state.todos = state.todos.map((todo) => {
				if (todo.id === action.payload) {
					return { ...todo, completed: !todo.completed };
				}
				return todo;
			})
    },
		currentTodo: (state, action) => {
			state.todo = action.payload;
			state.isUpdate = true;
		},
		updateTodo: (state, action) => {
			state.isUpdate = false;
			const { id, text } = action.payload;
			const todo = state.todos.find((todo) => todo.id === id);
      if (todo) {
        todo.text = text;
      }
    }
  },
});

//for components
export const { addTodo, deleteTodo, toggleTodo, updateTodo, currentTodo } = todosSlice.actions;

//for store
export default todosSlice.reducer;
