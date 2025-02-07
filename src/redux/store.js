import { configureStore } from '@reduxjs/toolkit';
import editorSettingsSliceReducer from './settings/editorSettingsSlice';
import fontSettingsSliceReducer from './fontSettings/fontSettingsSlice';
import headerBlockSliceReducer from './resume/headerBlockSlice';
import contactBlockSliceReducer from './resume/contactBlockSlice';
import summaryBlockSliceReducer from './resume/summaryBlockSlice';
import educationBlockSliceReducer from './resume/educationBlockSlice';
import experienceBlockSliceReducer from './resume/experienceBlockSlice';
import skillsBlockSliceReducer from './resume/skillsBlockSlice';
import languagesBlockSliceReducer from './resume/languagesBlockSlice';
import resumeAiBotSlice from './modals/resumeAiBotSlice';


export default configureStore({
    reducer: {
        editorSettings: editorSettingsSliceReducer,
        fontSettings: fontSettingsSliceReducer,
        resumeHeader: headerBlockSliceReducer,
        resumeContact: contactBlockSliceReducer,
        resumeSummary: summaryBlockSliceReducer,
        resumeEducation: educationBlockSliceReducer,
        resumeExperience: experienceBlockSliceReducer,
        resumeSkills: skillsBlockSliceReducer,
        resumeLanguages: languagesBlockSliceReducer,
        resumeAiBot: resumeAiBotSlice

    },
})