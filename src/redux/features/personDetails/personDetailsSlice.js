import { dbAPI } from "@/lib/dbAPI";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const personDetailsSlice = createSlice({
    name: 'personDetails',
    initialState: {
        data: {
            firstName: 'FirstName',
            lastName: 'LastName'
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
            .addCase(getPersonDetailsThunk.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(getPersonDetailsThunk.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(getPersonDetailsThunk.fulfilled, (state, action) => {

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
});


export const { inputUpdate } = personDetailsSlice.actions;
export default personDetailsSlice.reducer;


export const getPersonDetailsThunk = createAsyncThunk('personDetails/getPersonDetailsThunk', async (obj) => {
    let resp = await dbAPI.getSectionData('personDetails', obj.userId, obj.accessToken);
    if (resp) {
        return resp;
    } else {
        return null
    }
})