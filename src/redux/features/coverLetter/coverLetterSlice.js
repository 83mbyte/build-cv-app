import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { dbAPI } from "../../../api/api";

const coverLetterSlice = createSlice({
    name: 'coverLetter',
    initialState: {
        data: { value: 'initState CoverLetter' },
        __serv: { isSectionVisible: true },
        status: 'idle',
        error: ''
    },
    reducers: {
        inputCoverUpdate: (state, action) => {
            state.data.value = action.payload.value;
        }
    },
    extraReducers(builder) {
        builder
            .addCase(getCoverLetter.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(getCoverLetter.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(getCoverLetter.fulfilled, (state, action) => {

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

export default coverLetterSlice.reducer;
export const { inputCoverUpdate } = coverLetterSlice.actions;

export const getCoverLetter = createAsyncThunk('coverLetter/getCoverLetter', async (obj) => {
    let resp = await dbAPI.getSectionData('cover', obj.userId, obj.accessToken);
    if (resp) {
        return resp;
    } else {
        return null
    }
})