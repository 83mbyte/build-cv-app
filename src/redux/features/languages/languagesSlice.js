import { dbAPI } from "@/lib/dbAPI";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const DATA_TEMPLATE_OBJECT = {
    language: '',
    level: '',
}
const languagesSlice = createSlice({
    name: 'languages',
    initialState: {
        data: [],
        status: 'idle',
        error: ''
    },
    reducers: {
        inputLanguagesUpdate: (state, action) => {
            state.data[action.payload.arrayIndex][action.payload.inputName] = action.payload.value;
        },
        removeLanguagesItem: (state, action) => {
            state.data.splice(action.payload, 1);
            if (state.data.length < 1) {
                state.data = []
            }
        },
        addLanguagesItem: (state) => {
            state.data = [...state.data, DATA_TEMPLATE_OBJECT]
        }
    },

    extraReducers(builder) {
        builder
            .addCase(getLanguages.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(getLanguages.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(getLanguages.fulfilled, (state, action) => {
                state.status = 'ready';
                if (action.payload) {
                    if (action.payload.data) {
                        state.data = action.payload.data;
                    }
                }
            })
    }

})

export default languagesSlice.reducer;
export const { inputLanguagesUpdate, removeLanguagesItem, addLanguagesItem } = languagesSlice.actions;

export const getLanguages = createAsyncThunk('languages/getLanguages', async (obj) => {
    let resp = await dbAPI.getSectionData('languages', obj.userId, obj.accessToken);
    if (resp) {
        return resp;
    } else {
        return null
    }
})