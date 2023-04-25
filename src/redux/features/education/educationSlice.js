import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { dbAPI } from "../../../api/api";

const DATA_TEMPLATE_OBJECT = {
    degree: '',
    institution: '',
    location: '',
    period: '',
    comments: '',
}

const educationSlice = createSlice({
    name: 'education',
    initialState: {
        data: [],
        __serv: { isSectionVisible: true },
        status: 'idle',
        error: ''
    },
    reducers: {
        inputEducationUpdate: (state, action) => {
            state.data[action.payload.arrayIndex][action.payload.inputName] = action.payload.value;
        },
        removeEducationItem: (state, action) => {
            state.data.splice(action.payload, 1);
            if (state.data.length < 1) {
                state.data = []
            }
        },
        addEducationItem: (state) => {
            state.data = [...state.data, DATA_TEMPLATE_OBJECT]
        }

    },
    extraReducers(builder) {
        builder
            .addCase(getEducation.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(getEducation.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(getEducation.fulfilled, (state, action) => {
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

export default educationSlice.reducer;
export const { inputEducationUpdate, removeEducationItem, addEducationItem } = educationSlice.actions;

export const getEducation = createAsyncThunk('summary/getEducation', async (obj) => {
    let resp = await dbAPI.getSectionData('education', obj.userId, obj.accessToken);
    if (resp) {
        return resp;
    } else {
        return null
    }
})