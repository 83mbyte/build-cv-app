import { configureStore } from "@reduxjs/toolkit";

import authSliceReducer from "./features/auth/authSlice";
import utilitySliceReducer from "./features/utility/utilitySlice";
import personDetailsSliceReducer from "./features/personDetails/personDetailsSlice";
import summarySliceReducer from "./features/summary/summarySlice";
import educationSliceReducer from "./features/education/educationSlice";
import skillsSliceReducer from "./features/skills/skillsSlice";
import historySliceReducer from "./features/history/historySlice";
import linksSliceReducer from "./features/links/linksSlice";
import coursesSliceReducer from "./features/courses/coursesSlice";
import languagesSliceReducer from "./features/languages/languagesSlice";
import referencesSliceReducer from "./features/references/referencesSlice";
import hobbiesSliceReducer from "./features/hobbies/hobbiesSlice";
import userImageSliceReducer from "./features/userImage/userImageSlice";

export default configureStore({
    reducer: {
        auth: authSliceReducer,
        utility: utilitySliceReducer,
        personDetails: personDetailsSliceReducer,
        summary: summarySliceReducer,
        education: educationSliceReducer,
        skills: skillsSliceReducer,
        history: historySliceReducer,
        links: linksSliceReducer,
        courses: coursesSliceReducer,
        languages: languagesSliceReducer,
        references: referencesSliceReducer,
        hobbies: hobbiesSliceReducer,
        image: userImageSliceReducer,
        // templates: templatesSliceReducer,
        // cover: coverLetterSliceReducer
    }
})