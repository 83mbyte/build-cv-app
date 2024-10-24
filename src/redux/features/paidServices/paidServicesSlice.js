import { dbAPI } from "@/lib/dbAPI";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const paidServices = createSlice({
    name: 'getPaidServices',
    initialState: {
        data: {
            pdf: {
                isAllowed: false,
                filesAllowed: 2
            },

        },
        status: 'idle',
        error: ''
    },
    reducers: {
        setFilesAllowed: (state, action) => {
            if (state.data.pdf.filesAllowed > 0) {
                state.data.pdf.filesAllowed = state.data.pdf.filesAllowed + action.payload;
            } else {
                state.data.pdf.isAllowed = false;
            }
        },
        resetAllowedPdf: (state) => {
            state.data.pdf.isAllowed = true;
            state.data.pdf.filesAllowed = 2;
        }
    },
    extraReducers(builder) {
        builder
            .addCase(getPaidServicesThunk.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(getPaidServicesThunk.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(getPaidServicesThunk.fulfilled, (state, action) => {
                if (action.payload) {
                    state.status = 'ready';

                    if (action.payload.data) {
                        state.data = action.payload.data;
                    }
                    // if (action.payload.__serv) {
                    //     state.__serv = { ...action.payload.__serv };
                    // }
                }
            })
    }
})


export default paidServices.reducer;
export const { setFilesAllowed, resetAllowedPdf } = paidServices.actions

export const getPaidServicesThunk = createAsyncThunk('paidServices/getPaidServicesThunk', async (obj) => {
    let resp = await dbAPI.getSectionData('paidServices', obj.userId, obj.accessToken);

    if (resp) {
        return resp;
    } else {
        return null
    }
})
