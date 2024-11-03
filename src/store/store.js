import { configureStore } from "@reduxjs/toolkit";
import notesReducer from "./slices/notesSlice"
import authReducer from "./slices/authSlice"

export default configureStore({
    reducer:{
        notesSlice : notesReducer,
        authSlice : authReducer
    }
 
})