import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { dbAPI } from "../../../api/api";

const coverLetterSlice = createSlice({
    name: 'coverLetter',
    initialState: {
        data: {
            value: 'initState CoverLetter',
            jobTitle: '',
            company: '',
            hiringManager: ''
        },
        __serv: {
            isSectionVisible: true,
            btnLoading: false,
            btnDisabled: false,
        },
        status: 'idle',
        error: ''
    },
    reducers: {
        inputCoverUpdate: (state, action) => {
            state.data.value = action.payload.value;
        },
        inputQuizUpdate: (state, action) => {
            state.data[action.payload.name] = action.payload.value
        },
        toggleBtnLoadingStatus: (state) => {
            state.__serv.btnLoading = !state.__serv.btnLoading;
        },
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
                        state.data.value = action.payload.data.value
                    }
                    if (action.payload.__serv) {
                        state.__serv = { ...action.payload.__serv };
                    }
                }
            })
    }
})

export default coverLetterSlice.reducer;
export const { inputCoverUpdate, inputQuizUpdate, toggleBtnLoadingStatus } = coverLetterSlice.actions;

export const getCoverLetter = createAsyncThunk('coverLetter/getCoverLetter', async (obj) => {
    let resp = await dbAPI.getSectionData('cover', obj.userId, obj.accessToken);
    if (resp) {
        return resp;
    } else {
        return null
    }
})