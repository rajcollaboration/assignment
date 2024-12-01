import { configureStore } from "@reduxjs/toolkit";
import { mergeReducers } from "./Reducers";

export const store = configureStore({
    reducer: mergeReducers,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    }),
})