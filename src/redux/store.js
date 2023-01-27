import { configureStore } from "@reduxjs/toolkit";
import personDetailsReducer from "./features/personDetails/personDetailsSlice";
import summarySliceReducer from "./features/summary/summarySlice";

export default configureStore({
    reducer: {
        personDetails: personDetailsReducer,
        summary: summarySliceReducer
    }
})