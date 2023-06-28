import { combineReducers, configureStore } from "@reduxjs/toolkit";
import formReducer from "./slices/form.slice";


const rootReduser = combineReducers({
   formReducer,
});

export const store = configureStore({
   reducer: rootReduser,
})