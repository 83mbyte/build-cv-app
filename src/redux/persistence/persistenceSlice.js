
import { createSlice } from '@reduxjs/toolkit';

const persistenceSlice = createSlice({
    name: 'persistence',
    initialState: {
        hasUnsavedChanges: false,
        isSaving: false,
        lastSaved: null,
        error: null,
    },
    reducers: {
        setHasUnsavedChanges: (state, action) => {
            state.hasUnsavedChanges = action.payload;
        },
        setIsSaving: (state, action) => {
            state.isSaving = action.payload;
        },
        setLastSaved: (state, action) => {
            state.lastSaved = action.payload;
            state.isSaving = false;
            state.hasUnsavedChanges = false;
            state.error = null;
        },
        setSaveError: (state, action) => {
            state.isSaving = false;
            state.error = action.payload;
        }
    },
});

export const { setHasUnsavedChanges, setIsSaving, setLastSaved, setSaveError } = persistenceSlice.actions;

export default persistenceSlice.reducer;
