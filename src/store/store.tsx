import {configureStore} from "@reduxjs/toolkit";
import customerReducer from "../reducers/CustomerReducer";
import itemReducer from "../reducers/itemReducer";

export const store = configureStore({
    reducer :{
        customer : customerReducer,
        item : itemReducer
    }
})
export type  RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
