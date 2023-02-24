import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchAPI } from "../../../API/api";

export const summarySlice = createSlice({
    name: 'summary',
    initialState: {
        data: {
            label: '',
            path: 'summary',
            value: ''
        },
        status: 'idle',
        error: ''
    },
    reducers: {
        loadStateFrom: (state, action) => {
            state.data = action.payload
        },
        summaryStateValueUpdate: (state, action) => {
            state.data.value = action.payload
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchSummary.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchSummary.fulfilled, (state, action) => {
                state.status = 'succeeded';
                if (action.payload) {
                    state.data = action.payload.data;
                    state.isSectionVisible = action.payload.__serv.isSectionVisible;
                } else {
                    state.isSectionVisible = false;
                }
            })
            .addCase(fetchSummary.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(putDataSummary.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(putDataSummary.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data.value = action.payload;
            })

    }

})

export const { loadStateFrom, summaryStateValueUpdate } = summarySlice.actions;
export default summarySlice.reducer;

export const fetchSummary = createAsyncThunk('summary/fetchSummary', async (userName) => {
    const response = await fetchAPI.fethingSubPath('summary', userName)
    if (response && response !== 'Error -- fethingSubPath from api.js') {
        return response
    }
});

export const putDataSummary = createAsyncThunk('summary/putDataSummary', async (data) => {

    const response = await fetchAPI.putData(data.user, data.path, data.value);
    if (response && response.status === 200) {
        return data.value
    }
});

// export const putDataSummary = createAsyncThunk('summary/putDataSummary', async (userName, path, data) => {
//     const data = await fetchAPI.putData(userName, path, data);
// })
