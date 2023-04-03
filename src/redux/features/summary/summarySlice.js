import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { dbAPI } from "../../../api/api";

const summarySlice = createSlice({
    name: 'summary',
    initialState: {
        data: { value: 'initState' },
        __serv: { isSectionVisible: true },
        status: 'idle',
        error: ''
    },
    reducers: {
        inputSummaryUpdate: (state, action) => {
            state.data.value = action.payload.value;
        }
    },
    extraReducers(builder) {
        builder
            .addCase(getSummary.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(getSummary.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(getSummary.fulfilled, (state, action) => {

                if (action.payload) {
                    state.status = 'ready';

                    if (action.payload.data) {
                        state.data = action.payload.data;
                    }
                    if (action.payload.__serv) {
                        state.__serv = { ...action.payload.__serv };
                    }
                }
            })
    }
})

export default summarySlice.reducer;
export const { inputSummaryUpdate } = summarySlice.actions;

export const getSummary = createAsyncThunk('summary/getSummary', async (obj) => {
    let resp = await dbAPI.getSectionData('summary', obj.userId);
    if (resp) {
        return resp;
    } else {
        return null
    }
})