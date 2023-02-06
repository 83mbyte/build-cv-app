import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchAPI } from "../../../API/api";


const DATA_TEMPLATE_OBJECT = {
    language: {
        label: "Language",
        path: 'languages/language',
        type: 'text',
        value: ''
    },
    level: {
        label: "Level",
        path: 'languages/level',
        type: 'select',
        value: ''
    }
}

export const languagesSlice = createSlice({
    name: 'languages',
    initialState: {
        data: [],
        status: 'idle',
        isSectionVisible: false,
        error: ''
    },
    reducers: {
        addNewLanguagesItem: (state) => {
            state.data = [...state.data, DATA_TEMPLATE_OBJECT];
        },
        removeLanguagesItem: (state, action) => {
            state.data.splice(action.payload, 1);
            if (state.data.length < 1) {
                state.data = []
            }
        },
        languagesStateValueUpdate: (state, action) => {
            state.data[action.payload.path[0]][action.payload.path[1]].value = action.payload.value;
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchLanguages.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(fetchLanguages.fulfilled, (state, action) => {
                state.status = 'succeeded';
                if (action.payload && action.payload.data) {
                    state.data = action.payload.data;
                    state.isSectionVisible = action.payload.__serv.isSectionVisible;

                } else {
                    state.data = [];
                    state.isSectionVisible = false;
                }
            })
            .addCase(fetchLanguages.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
    }
});


export default languagesSlice.reducer;
export const { addNewLanguagesItem, removeLanguagesItem, languagesStateValueUpdate } = languagesSlice.actions;

export const fetchLanguages = createAsyncThunk('languages/fetchLanguages', async (userName) => {
    const response = await fetchAPI.fethingSubPath('languages', userName);
    if (response && response !== 'Error -- fethingSubPath from api.js') {
        return response;
    }
})
