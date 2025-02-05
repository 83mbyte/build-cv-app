import { createSlice } from "@reduxjs/toolkit";

export const summaryBlockSlice = createSlice({
    name: 'resumeSummary',
    initialState: {
        summaryHeading: null,
        summaryText: null,
    },
    reducers: {
        setResumeSummaryData: (state, action) => {

            return {
                ...state,
                [action.payload.name]: action.payload.value
            }
        }
    }
})

export const { setResumeSummaryData } = summaryBlockSlice.actions;
export default summaryBlockSlice.reducer;