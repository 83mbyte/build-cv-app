import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import coursesSliceReducer from "./features/courses/coursesSlice";
import educationSliceReducer from "./features/education/educationSlice";
import employmentHistorySliceReducer from "./features/employmentHistory/employmentHistorySlice";
import personDetailsReducer from "./features/personDetails/personDetailsSlice";
import skillsSliceReducer from "./features/skills/skillsSlice";
import summarySliceReducer from "./features/summary/summarySlice";
import utilitySliceReducer from "./features/utility/utilitySlice";
import websoclinksSliceReducer from "./features/websoclinks/websoclinksSlice";

export default configureStore({
    reducer: {
        personDetails: personDetailsReducer,
        summary: summarySliceReducer,
        education: educationSliceReducer,
        websoclinks: websoclinksSliceReducer,
        skills: skillsSliceReducer,
        courses: coursesSliceReducer,
        employmentHistory: employmentHistorySliceReducer,
        utility: utilitySliceReducer,

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