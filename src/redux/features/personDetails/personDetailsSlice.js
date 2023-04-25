import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { dbAPI } from "../../../api/api";

const personDetailsSlice = createSlice({
    name: 'personDetails',
    initialState: {
        data: {
            firstName: 'First',
            lastName: 'Last'
        },
        __serv: { isSectionVisible: true },
        status: 'idle',
        error: '',

    },
    reducers: {
        inputUpdate: (state, action) => {
            state.data[action.payload.inputName] = action.payload.value;
        }
    },
    extraReducers(builder) {
        builder
            .addCase(getPersonDetails.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(getPersonDetails.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(getPersonDetails.fulfilled, (state, action) => {

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

export const { inputUpdate } = personDetailsSlice.actions;
export default personDetailsSlice.reducer;

export const getPersonDetails = createAsyncThunk('personDetails/getPersonDetails', async (obj) => {

    let resp = await dbAPI.getSectionData('personDetails', obj.userId, obj.accessToken);
    if (resp) {
        return resp;
    } else {
        return null
    }
})