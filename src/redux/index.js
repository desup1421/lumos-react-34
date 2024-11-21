import { configureStore } from '@reduxjs/toolkit';
//persist
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { encryptTransform } from "redux-persist-transform-encrypt";

// import todoReducer from "./slices/todosSlice";
import todoReducer from "./async/todosSlice";
import langReducer from "./slices/langSlice";
import themeReducer from "./slices/themeSlice";
import { combineReducers } from 'redux';

//Encryption(not needed just practice it)
const encryptor = encryptTransform({
    secretKey: import.meta.env.VITE_SECRET_KEY,
    onError: function (error) {
        console.error("encryption error: ", error);
    },
});

//Configure the react-persist
const persistConfig = {
    key: "root",
    storage,
    whitelist: ["todos", "lang", "theme"],
    transforms: [encryptor],
};

//Combine outside store
const rootReducer = combineReducers({
    todos: todoReducer,
    theme: themeReducer,
    lang: langReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware({
            serializableCheck: false,
        })
    }
);

export const persistor = persistStore(store);
