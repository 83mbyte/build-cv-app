import { createSlice } from "@reduxjs/toolkit";

const interviewSlice = createSlice({
    name: 'interview',
    initialState: {
        data: {
            messages: [],
            conclusion: null
        },
        settings: {
            category: '',
            position: '',
            lang: 'English'
        },
        error: '',
        status: 'idle'
    },
    reducers: {
        interviewSettingsUpdate: (state, action) => {
            if (action?.payload) {
                state.settings[action.payload.name] = action.payload.value;
            }
        },
        interviewStatusUpdate: (state, action) => {

            if (action?.payload) {
                state.status = action.payload;
            } else {
                state.status = '';
            }
        },
        interviewMessagesUpdate: (state, action) => {
            if (action?.payload) {
                state.data.messages = [...state.data.messages, action.payload];
            }
        },
        interviewConclusionUpdate: (state, action) => {
            if (action?.payload) {
                state.data.conclusion = action.payload;
            }
        }
    }
});


export default interviewSlice.reducer;
export const { interviewSettingsUpdate, interviewStatusUpdate, interviewMessagesUpdate, interviewConclusionUpdate } = interviewSlice.actions;
