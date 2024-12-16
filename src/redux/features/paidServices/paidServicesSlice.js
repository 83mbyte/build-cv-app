import { dbAPI } from "@/lib/dbAPI";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const paidServices = createSlice({
    name: 'getPaidServices',
    initialState: {
        data: {
            pdf: {
                isAllowed: false,
                filesAllowed: 0
            },

        },
        status: 'idle',
        error: ''
    },
    reducers: {
        setFilesAllowed: (state, action) => {
            if (state.data.pdf.filesAllowed + action.payload <= 0) {

                state.data.pdf.isAllowed = false;
            }

            state.data.pdf.filesAllowed = state.data.pdf.filesAllowed + action.payload;
        },
        // resetAllowedPdf: (state) => {
        //     state.data.pdf.isAllowed = true;
        //     state.data.pdf.filesAllowed = 2;
        // },
        setStatusPaidServices: (state, action) => {
            if (action?.payload?.status) {
                state.status = action.payload.status
            } else {
                state.status = 'idle'
            }
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
export const { setFilesAllowed, resetAllowedPdf, setStatusPaidServices } = paidServices.actions

export const getPaidServicesThunk = createAsyncThunk('paidServices/getPaidServicesThunk', async (obj) => {
    let resp = await dbAPI.getSectionData('paidServices', obj.userId, obj.accessToken);

    if (resp) {
        return resp;
    } else {
        return null
    }
})
