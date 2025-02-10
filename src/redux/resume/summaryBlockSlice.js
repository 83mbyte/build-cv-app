import { createSlice } from "@reduxjs/toolkit";

export const summaryBlockSlice = createSlice({
    name: 'resumeSummary',
    initialState: {
        isVisible: true,
        summaryHeading: null,
        summaryText: null,
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
    }
})

export const { setResumeSummaryData, setResumeSummaryIsVisible } = summaryBlockSlice.actions;
export default summaryBlockSlice.reducer;