import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { dbAPI } from "../../../api/api";

const hobbiesSlice = createSlice({
    name: 'hobbies',
    initialState: {
        data: { value: '' },
        __serv: { isSectionVisible: false },
        status: 'idle',
        error: ''
    },
    reducers: {
        inputHobbiesUpdate: (state, action) => {
            state.data.value = action.payload.value;
        },
        hobbiesVisibleToggler: (state) => {
            state.__serv.isSectionVisible = !state.__serv.isSectionVisible;
        }
    },
    extraReducers(builder) {
        builder
            .addCase(getHobbies.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(getHobbies.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(getHobbies.fulfilled, (state, action) => {

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

export default hobbiesSlice.reducer;
export const { inputHobbiesUpdate, hobbiesVisibleToggler } = hobbiesSlice.actions;

export const getHobbies = createAsyncThunk('hobbies/getHobbies', async (obj) => {
    let resp = await dbAPI.getSectionData('hobbies', obj.userId);
    if (resp) {
        return resp;
    } else {
        return null
    }
})