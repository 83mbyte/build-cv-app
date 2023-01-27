import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchAPI } from "../../../API/api";

export const educationSlice = createSlice({
    name: 'education',
    initialState: {
        data: [
            {
                degree: {
                    label: 'Degree',
                    path: '',
                    type: 'text',
                    value: ''
                },
                description: {
                    label: '',
                    path: '',
                    type: 'wysiwyg',
                    value: ''
                },
                location: {
                    label: 'Location',
                    path: '',
                    type: 'text',
                    value: ''
                },
                period: {
                    label: 'Start - End date',
                    path: '',
                    type: 'text',
                    value: 'xxxx - yyyy'
                },
                title: {
                    label: 'School',
                    path: '',
                    type: 'text',
                    value: ''
                },
            }
        ],
        status: 'idle',
        error: ''
    },
    reducers: {
        loadStateFrom: (state, action) => {
            state.data = action.payload
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchEducation.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchEducation.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchEducation.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
    }
})

export const { loadStateFrom } = educationSlice.actions;
export default educationSlice.reducer;


export const fetchEducation = createAsyncThunk('education/fetchEducation', async (userName) => {
    const response = await fetchAPI.fethingSubPath('education', userName)
    if (response && response !== 'Error -- fethingSubPath from api.js') {
        return response
    }
})

