import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchAPI } from "../../../API/api";

const DATA_TEMPLATE_OBJECT = {
    degree: {
        label: 'Degree',
        path: 'education/degree',
        type: 'text',
        value: ''
    },
    wysiwyg: {
        label: '',
        path: 'education/wysiwyg',
        type: 'wysiwyg',
        value: ''
    },
    location: {
        label: 'Location',
        path: 'education/location',
        type: 'text',
        value: ''
    },
    period: {
        label: 'Start - End date',
        path: 'education/period',
        type: 'text',
        value: ''
    },
    title: {
        label: 'School',
        path: 'education/title',
        type: 'text',
        value: ''
    },
}

export const educationSlice = createSlice({
    name: 'education',
    initialState: {
        data: [
            DATA_TEMPLATE_OBJECT
        ],
        status: 'idle',
        error: ''
    },
    reducers: {
        loadStateFrom: (state, action) => {
            state.data = action.payload
        },
        educationStateValueUpdate: (state, action) => {
            state.data[action.payload.path[0]][action.payload.path[1]].value = action.payload.value;

        },
        addNewEducationItem: (state) => {
            state.data = [...state.data, DATA_TEMPLATE_OBJECT];
        },
        removeEducationItem: (state, action) => {
            state.data.splice(action.payload, 1);
            if (state.data.length < 1) {
                state.data = [DATA_TEMPLATE_OBJECT]
            }
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchEducation.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchEducation.fulfilled, (state, action) => {
                state.status = 'succeeded';
                if (action.payload) {
                    state.data = action.payload
                } else {
                    state.data = [DATA_TEMPLATE_OBJECT]
                }
            })
            .addCase(fetchEducation.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
    }
})

export const { loadStateFrom, educationStateValueUpdate, addNewEducationItem, removeEducationItem } = educationSlice.actions;
export default educationSlice.reducer;


export const fetchEducation = createAsyncThunk('education/fetchEducation', async (userName) => {
    const response = await fetchAPI.fethingSubPath('education', userName)
    if (response && response !== 'Error -- fethingSubPath from api.js') {
        return response
    }
})

