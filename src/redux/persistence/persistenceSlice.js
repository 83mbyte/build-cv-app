
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getDataFromFunctionsEndpoint } from '@/lib/commonScripts';

export const getResumeDataThunk = createAsyncThunk(
    'persistence/getResumeData',
    async ({ userId, accessToken }, { rejectWithValue }) => {
        try {
            const options = {
                method: 'POST',
                body: JSON.stringify({ userId, accessToken }),
                headers: { 'Content-Type': 'application/json' },
            };
            const res = await getDataFromFunctionsEndpoint('getResumeData', options);
            if (!res || !res.ok) {
                const errorData = await res?.json();
                throw new Error(errorData?.message || 'Failed to fetch resume data.');
            }
            const result = await res.json();
            // Return result.data which can be null if no data is found
            return result.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

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
