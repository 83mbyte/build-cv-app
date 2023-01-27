import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchAPI } from "../../../API/api";

export const summarySlice = createSlice({
    name: 'summary',
    initialState: {
        data: {
            label: '',
            path: '',
            value: ''
        },
        status: 'idle',
        error: ''
    },
    reducers: {
        loadStateFrom: (state, action) => {
            state.data = action.payload
        },
    },
    extraReducers(builder) {
        builder
            .addCase(fetchSummary.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchSummary.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchSummary.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
    }

})

export const { loadStateFrom } = summarySlice.actions;
export default summarySlice.reducer;

export const fetchSummary = createAsyncThunk('summary/fetchSummary', async (userName) => {
    const data = await fetchAPI.fethingSubPath('summary', userName)
    if (data && data !== 'Error -- fethingSubPath from api.js') {
        return data
    }
})
