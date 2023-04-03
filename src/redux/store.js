import { configureStore } from "@reduxjs/toolkit";
import coursesSliceReducer from "./features/courses/coursesSlice";
import educationSliceReducer from "./features/education/educationSlice";
import historySliceReducer from "./features/history/historySlice";
import hobbiesSliceReducer from "./features/hobbies/hobbiesSlice";
import languagesSliceReducer from "./features/languages/languagesSlice";
import linksSliceReducer from "./features/links/linksSlice";
import personDetailsSliceReducer from "./features/personDetails/personDetailsSlice";
import referencesSliceReducer from "./features/references/referencesSlice";
import skillsSliceReducer from "./features/skills/skillsSlice";
import summarySliceReducer from "./features/summary/summarySlice";
import utilitySliceReducer from "./features/utility/utilitySlice";

export default configureStore({
    reducer: {
        utility: utilitySliceReducer,
        personDetails: personDetailsSliceReducer,
        summary: summarySliceReducer,
        education: educationSliceReducer,
        links: linksSliceReducer,
        skills: skillsSliceReducer,
        courses: coursesSliceReducer,
        history: historySliceReducer,
        languages: languagesSliceReducer,
        references: referencesSliceReducer,
        hobbies: hobbiesSliceReducer
    }
})