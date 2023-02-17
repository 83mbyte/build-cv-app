import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchAPI } from "../../../API/api";

const DATA_TEMPLATE_OBJECT = {
    label: '',
    path: 'hobbies',
    value: ''
}

export const hobbiesSlice = createSlice({
    name: 'hobbies',
    initialState: {
        data: { ...DATA_TEMPLATE_OBJECT },
        status: 'idle',
        error: '',
        isSectionVisible: false
    },
    reducers: {
        hobbiesStateValueUpdate: (state, action) => {
            state.data.value = action.payload;
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchHobbies.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchHobbies.fulfilled, (state, action) => {
                state.status = 'succeeded';
                if (action.payload) {
                    if (action.payload.data) {
                        state.data.value = action.payload.data;
                    }
                    if (action.payload.__serv) {
                        state.isSectionVisible = action.payload.__serv.isSectionVisible;
                    }
                } else {
                    state.data = { ...DATA_TEMPLATE_OBJECT };
                    state.isSectionVisible = false;
                }
            })
            .addCase(fetchHobbies.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
    }
})
export const { hobbiesStateValueUpdate } = hobbiesSlice.actions;
export default hobbiesSlice.reducer;

export const fetchHobbies = createAsyncThunk('hobbies/fetchHobbies', async (userName) => {
    const response = await fetchAPI.fethingSubPath('hobbies', userName)
    if (response && response !== 'Error -- fethingSubPath from api.js') {
        return response
    }
});

