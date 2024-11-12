import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const interviewSlice = createSlice({
    name: 'interview',
    initialState: {
        data: {
            // PROD messages
            // messages: []

            // DEV messages
            messages: [{
                role: "assistant",
                content: "Sed felis sem, lobortis id ex non, egestas ultrices velit. Ut ut ex non justo egestas iaculis eget et nisi. Aenean at diam nisl. Suspendisse ac lectus justo. Donec nisi mi, dapibus at porttitor eget, molestie vitae ante. "
            }]
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
            console.log('action', action)
            if (action?.payload) {
                state.status = action.payload
            } else {
                state.status = ''
            }
        },
        interviewMessagesUpdate: (state, action) => {
            if (action?.payload) {
                state.data.messages = [...state.data.messages, action.payload]
            }
        }
    }
});


export default interviewSlice.reducer;
export const { interviewSettingsUpdate, interviewStatusUpdate, interviewMessagesUpdate } = interviewSlice.actions;
