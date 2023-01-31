import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import educationSliceReducer from "./features/education/educationSlice";
import personDetailsReducer from "./features/personDetails/personDetailsSlice";
import summarySliceReducer from "./features/summary/summarySlice";
import utilitySliceReducer from "./features/utility/utilitySlice";

export default configureStore({
    reducer: {
        personDetails: personDetailsReducer,
        summary: summarySliceReducer,
        education: educationSliceReducer,
        utility: utilitySliceReducer
    },
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    //     // serializableCheck: false
    //     serializableCheck: {
    //         //     ignoredActions: ['summary/putDataSummary/fulfilled'],
    //         ignoredActionPaths: ['meta']
    //     }

    //     // ignoredActionPaths: ['meta.arg', 'payload.timestamp']
    // })
})