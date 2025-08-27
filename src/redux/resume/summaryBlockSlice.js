import { createSlice } from "@reduxjs/toolkit";
import { getResumeDataThunk } from "../persistence/persistenceSlice";
export const summaryBlockSlice = createSlice({
    name: 'resumeSummary',
    initialState: {
        isVisible: true,
        summaryHeading: null,
        summaryText: null,
        assistant: {
            generatedItems: null,
            selectedItems: null,
            status: 'idle'
        }
    },
    reducers: {
        setResumeSummaryData: (state, action) => {
            return {
                ...state,
                [action.payload.name]: action.payload.value
            }
        },
        setResumeSummaryIsVisible: (state, action) => {
            if (action.payload) {
                return {
                    ...state,
                    isVisible: action.payload.show
                }
            }
        },
        setSummaryGeneratedItems: (state, action) => {
            if (action.payload && action.payload.value) {
                return {
                    ...state,
                    assistant: {
                        ...state.assistant,
                        generatedItems: [action.payload.value]
                    }
                }
            }
        },
        addSummarySelectedItems: (state, action) => {
            if (action.payload && action.payload.value) {

                return {
                    ...state,
                    assistant: {
                        ...state.assistant,
                        selectedItems: [action.payload.value]
                    }
                }
            }
        },
        removeSummarySelectedItems: (state, action) => {
            if (action.payload && action.payload.value && state.assistant.selectedItems) {
                return {
                    ...state,
                    assistant: {
                        ...state.assistant,
                        selectedItems: null
                    }
                }
            }
        },
        setSummaryStatus: (state, action) => {
            return {
                ...state,
                assistant: {
                    ...state.assistant,
                    status: action.payload ?? 'idle'
                }
            }
        },
        clearSummaryAssistantData: (state) => {
            return {
                ...state,
                assistant: {
                    generatedItems: null,
                    selectedItems: null,
                    status: 'idle'
                }
            }
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getResumeDataThunk.fulfilled, (state, action) => {
            if (action.payload && action.payload.resumeSummary) {
                return { ...state, ...action.payload.resumeSummary };
            }
        });
    }
})

export const { setResumeSummaryData, setResumeSummaryIsVisible, setSummaryGeneratedItems, addSummarySelectedItems, removeSummarySelectedItems, setSummaryStatus, clearSummaryAssistantData } = summaryBlockSlice.actions;
export default summaryBlockSlice.reducer;