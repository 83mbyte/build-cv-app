import { createSlice } from "@reduxjs/toolkit";

export const summaryBlockSlice = createSlice({
    name: 'resumeSummary',
    initialState: {
        isVisible: true,
        summaryHeading: null,
        summaryText: null,
        assistant: {
            genereatedItems: null,
            selectedItems: null
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
                        generatedItems: action.payload.value
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
    }
})

export const { setResumeSummaryData, setResumeSummaryIsVisible, setSummaryGeneratedItems, addSummarySelectedItems, removeSummarySelectedItems } = summaryBlockSlice.actions;
export default summaryBlockSlice.reducer;