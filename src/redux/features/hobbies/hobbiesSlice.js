import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { dbAPI } from "../../../api/api";

const hobbiesSlice = createSlice({
    name: 'hobbies',
    initialState: {
        data: { value: '' },
        status: 'idle',
        error: ''
    },
    reducers: {
        inputHobbiesUpdate: (state, action) => {
            state.data.value = action.payload.value;
        },

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
                state.status = 'ready';
                if (action.payload) {

                    if (action.payload.data) {
                        state.data = action.payload.data;
                    }
                }
            })
    }
})

export default hobbiesSlice.reducer;
export const { inputHobbiesUpdate } = hobbiesSlice.actions;

export const getHobbies = createAsyncThunk('hobbies/getHobbies', async (obj) => {
    let resp = await dbAPI.getSectionData('hobbies', obj.userId, obj.accessToken);
    if (resp) {
        return resp;
    } else {
        return null
    }
})