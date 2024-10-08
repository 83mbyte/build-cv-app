import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from "./features/auth/authSlice";
import utilitySliceReducer from "./features/utility/utilitySlice";
import personDetailsSliceReducer from "./features/personDetails/personDetailsSlice";
import summarySliceReducer from "./features/summary/summarySlice";
import educationSliceReducer from "./features/education/educationSlice";


export default configureStore({
    reducer: {
        auth: authSliceReducer,
        utility: utilitySliceReducer,
        personDetails: personDetailsSliceReducer,
        summary: summarySliceReducer,
        education: educationSliceReducer,
        // links: linksSliceReducer,
        // skills: skillsSliceReducer,
        // courses: coursesSliceReducer,
        // history: historySliceReducer,
        // languages: languagesSliceReducer,
        // references: referencesSliceReducer,
        // hobbies: hobbiesSliceReducer,
        // image: userImageSliceReducer,
        // templates: templatesSliceReducer,
        // cover: coverLetterSliceReducer
    }
})