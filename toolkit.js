import { configureStore, createSlice} from "@reduxjs/toolkit";

const initialState = {
    count: 0,
}

const counterSlice = createSlice({
    name: "counter",
    initialState,
    reducers: {
        increament: (state) => {
            state.count += 1;
        },
        decrement: (state) => {
            state.count -= 1;
        }
    }
})

const logger = (store) => (next) => (action) => {
    console.log('action', action);
    next(action);
    console.log('state sekarang', store.getState());
};

// combine middleware
// const combinrMiddleware = [logger, logger2];

const store = configureStore({
    reducer: {
        counter: counterSlice.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)
})

store.subscribe(() => {
    console.log('state', store.getState());
})

store.dispatch(counterSlice.actions.increament())
store.dispatch(counterSlice.actions.increament())
store.dispatch(counterSlice.actions.decrement())