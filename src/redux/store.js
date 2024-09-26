import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from "./features/auth/authSlice";


export default configureStore({
    reducer: {
        auth: authSliceReducer,
        // personDetails: personDetailsSliceReducer,
        // summary: summarySliceReducer,
        // education: educationSliceReducer,
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