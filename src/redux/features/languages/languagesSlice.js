import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { dbAPI } from "../../../api/api";

const DATA_TEMPLATE_OBJECT = {
    language: '',
    level: '',
}
const languagesSlice = createSlice({
    name: 'languages',
    initialState: {
        data: [],
        __serv: { isSectionVisible: false },
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
        },
        languagesVisibleToggler: (state) => {
            state.__serv.isSectionVisible = !state.__serv.isSectionVisible;
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

export default languagesSlice.reducer;
export const { inputLanguagesUpdate, removeLanguagesItem, addLanguagesItem, languagesVisibleToggler } = languagesSlice.actions;

export const getLanguages = createAsyncThunk('languages/getLanguages', async (obj) => {
    let resp = await dbAPI.getSectionData('languages', obj.userId);
    if (resp) {
        return resp;
    } else {
        return null
    }
})