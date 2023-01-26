import { configureStore } from "@reduxjs/toolkit";
import personDetailsReducer from "./features/personDetails/personDetailsSlice";

export default configureStore({
    reducer: {
        personDetails: personDetailsReducer
    }
})