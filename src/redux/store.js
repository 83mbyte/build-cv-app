import { configureStore, } from '@reduxjs/toolkit';
import editorSettingsSliceReducer from './settings/editorSettingsSlice';
import fontSettingsSliceReducer from './fontSettings/fontSettingsSlice';

export default configureStore({
    reducer: {
        editorSettings: editorSettingsSliceReducer,
        fontSettings: fontSettingsSliceReducer,
        // resumeHeader: headerBlockSliceReducer,
        // resumeContact: contactBlockSliceReducer,
        // resumeSummary: summaryBlockSliceReducer,
        // resumeEducation: educationBlockSliceReducer,
        // resumeExperience: experienceBlockSliceReducer,
        // resumeSkills: skillsBlockSliceReducer,
        // resumeLanguages: languagesBlockSliceReducer,
        // dialogAiWriter: dialogAiWriterSliceReducer

    },
})