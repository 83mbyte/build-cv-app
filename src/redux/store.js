import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import coursesSliceReducer from "./features/courses/coursesSlice";
import educationSliceReducer from "./features/education/educationSlice";
import employmentHistorySliceReducer from "./features/employmentHistory/employmentHistorySlice";
import hobbiesSliceReducer from "./features/hobbies/hobbiesSlice";
import languagesSliceReducer from "./features/languages/languagesSlice";
import personDetailsReducer from "./features/personDetails/personDetailsSlice";
import referencesSliceReducer from "./features/references/referencesSlice";
import skillsSliceReducer from "./features/skills/skillsSlice";
import summarySliceReducer from "./features/summary/summarySlice";
import templatesSliceReducer from "./features/templates/templatesSlice";
import utilitySliceReducer from "./features/utility/utilitySlice";
import websoclinksSliceReducer from "./features/websoclinks/websoclinksSlice";
import imageSliceReducer from "./features/image/imageSlice";

export default configureStore({
    reducer: {
        personDetails: personDetailsReducer,
        summary: summarySliceReducer,
        education: educationSliceReducer,
        websoclinks: websoclinksSliceReducer,
        skills: skillsSliceReducer,
        courses: coursesSliceReducer,
        employmentHistory: employmentHistorySliceReducer,
        languages: languagesSliceReducer,
        references: referencesSliceReducer,
        hobbies: hobbiesSliceReducer,
        image: imageSliceReducer,
        templates: templatesSliceReducer,
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