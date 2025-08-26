
import { setHasUnsavedChanges } from '../persistence/persistenceSlice';

// List of action prefixes that we consider "resume data changes"
const RESUME_ACTION_PREFIXES = [
    'resumeHeader/',
    'resumeContact/',
    'resumeSummary/',
    'resumeEducation/',
    'resumeExperience/',
    'resumeSkills/',
    'resumeLanguages/',
    'fontSettings/', // Changing fonts should also be saved..
    'editorSettings/setLayout' // ..and save the layout change.
];

// Actions to ignore (e.g. visibility management, not data management)
const IGNORED_ACTION_TYPES = [
    'resumeSummary/setResumeSummaryIsVisible',
    'resumeEducation/setResumeEducationIsVisible',
    'resumeExperience/setResumeExperienceIsVisible',
    'resumeSkills/setResumeSkillsIsVisible',
    'resumeLanguages/setResumeLanguagesIsVisible',
];


const persistenceMiddleware = store => next => action => {
    const { type } = action;

    // Check if the action is one of those that change data
    const isTrackedAction = RESUME_ACTION_PREFIXES.some(prefix => type.startsWith(prefix))
        && !IGNORED_ACTION_TYPES.includes(type);

    if (isTrackedAction) {
        const { hasUnsavedChanges } = store.getState().persistence;
        // Set the flag only if it is not already set to avoid unnecessary re-renders
        if (!hasUnsavedChanges) {
            store.dispatch(setHasUnsavedChanges(true));
        }
    }

    return next(action);
};

export default persistenceMiddleware;
