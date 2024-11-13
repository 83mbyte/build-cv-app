import { createSlice } from "@reduxjs/toolkit";

const interviewSlice = createSlice({
    name: 'interview',
    initialState: {
        data: {
            messages: []
        },
        settings: {
            category: '',
            position: '',
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
        }
    }
});


export default interviewSlice.reducer;
export const { interviewSettingsUpdate, interviewStatusUpdate, interviewMessagesUpdate } = interviewSlice.actions;
