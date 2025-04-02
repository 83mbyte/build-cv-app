import { createSlice } from "@reduxjs/toolkit";

export const interviewSlice = createSlice({
    name: 'interview',
    initialState: {
        data: {
            messages: [],
            conclusion: null
        },
        settings: {
            category: '',
            position: '',
            language: 'English',
            difficulty: 'Competent level',
            totalQuestions: 7,
        },
        currentStep: 0,
        error: '',
        status: '',


    },
    reducers: {
        setCurrentStep: (state, action) => {
            return {
                ...state,
                currentStep: action.payload
            }
        },
        setInterviewStatus: (state, action) => {
            return {
                ...state,
                status: action.payload ?? ''
            }
        },
        setInterviewSettings: (state, action) => {
            if (action.payload) {
                return {
                    ...state,
                    settings: {
                        ...state.settings,
                        [action.payload.field]: action.payload.value
                    }
                }
            } else {
                return { ...state }
            }
        },
        interviewMessagesPut: (state, action) => {
            if (action?.payload) {
                state.data.messages = [...action.payload];
            }
        },
        interviewMessagesUpdate: (state, action) => {
            if (action?.payload) {
                state.data.messages = [...state.data.messages, action.payload];
            }
        },


        interviewMessagesClear: (state) => {
            // state.data.messages = [];
            state.data = { messages: [], conclusion: null }
        },
        interviewConclusionUpdate: (state, action) => {
            if (action?.payload) {
                state.data.conclusion = action.payload;
            }
        }
    }
})


export const { setInterviewSettings, setInterviewStatus, setCurrentStep, interviewMessagesUpdate, interviewMessagesPut, interviewConclusionUpdate, interviewMessagesClear } = interviewSlice.actions;
export default interviewSlice.reducer;