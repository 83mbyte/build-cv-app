import { dbAPI } from "@/lib/dbAPI";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


const summarySlice = createSlice({
    name: 'summary',
    initialState: {
        data: { value: '' },
        __serv: { isSectionVisible: true, isLoading: true },
        status: 'idle',
        error: ''
    },
    reducers: {
        inputSummaryUpdate: (state, action) => {
            state.data.value = action.payload.value;
        },
        setIsLoadingAutoSummary: (state, action) => {
            if (!action.payload) {
                state.__serv = {
                    ...state.__serv,
                    isLoading: !state.__serv.isLoading
                }
            } else {
                state.__serv = {
                    ...state.__serv,
                    isLoading: action.payload
                }
            }
        },
        setSummaryErrorMessage: (state, action) => {
            if (action?.payload?.message) {
                state.error = action.payload.message;
            } else {
                state.error = ''
            }
        },
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
export const { inputSummaryUpdate, setIsLoadingAutoSummary, setSummaryErrorMessage } = summarySlice.actions;

export const getSummary = createAsyncThunk('summary/getSummary', async (obj) => {
    let resp = await dbAPI.getSectionData('summary', obj.userId, obj.accessToken);
    if (resp) {
        return resp;
    } else {
        return null
    }
})