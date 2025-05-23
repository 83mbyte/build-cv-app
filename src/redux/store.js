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
import authSliceReducer from './auth/authSlice';
import coverLetterSliceReducer from './coverLetter/coverLetterSlice';
import interviewSliceReducer from './interview/interviewSlice';


// export default configureStore({
//     reducer: {
//         auth: authSliceReducer,
//         editorSettings: editorSettingsSliceReducer,
//         fontSettings: fontSettingsSliceReducer,
//         resumeHeader: headerBlockSliceReducer,
//         resumeContact: contactBlockSliceReducer,
//         resumeSummary: summaryBlockSliceReducer,
//         resumeEducation: educationBlockSliceReducer,
//         resumeExperience: experienceBlockSliceReducer,
//         resumeSkills: skillsBlockSliceReducer,
//         resumeLanguages: languagesBlockSliceReducer,
//         coverLetter: coverLetterSliceReducer,
//         interview: interviewSliceReducer
//     },
// })

export const makeStore = () => {
    return configureStore({
        reducer: {
            auth: authSliceReducer,
            editorSettings: editorSettingsSliceReducer,
            fontSettings: fontSettingsSliceReducer,
            resumeHeader: headerBlockSliceReducer,
            resumeContact: contactBlockSliceReducer,
            resumeSummary: summaryBlockSliceReducer,
            resumeEducation: educationBlockSliceReducer,
            resumeExperience: experienceBlockSliceReducer,
            resumeSkills: skillsBlockSliceReducer,
            resumeLanguages: languagesBlockSliceReducer,
            coverLetter: coverLetterSliceReducer,
            interview: interviewSliceReducer
        }
    })
}