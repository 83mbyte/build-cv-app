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
        buttonStatus: 'disabled',
        error: ''
    },
    reducers: {
        loadStateFrom: (state, action) => {
            state.data = action.payload
        },
        educationStateValueUpdate: (state, action) => {
            state.data[action.payload.path[0]][action.payload.path[1]].value = action.payload.value;
            state.buttonStatus = 'enabled';
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
            .addCase(putDataEducation.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(putDataEducation.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.buttonStatus = 'disabled'
                // state.error = action.error.message
            })
            .addCase(putDataEducation.pending, (state, action) => {
                state.buttonStatus = 'loading'
            })

    }
})

export const { loadStateFrom, educationStateValueUpdate } = educationSlice.actions;
export default educationSlice.reducer;


export const fetchEducation = createAsyncThunk('education/fetchEducation', async (userName) => {
    const response = await fetchAPI.fethingSubPath('education', userName)
    if (response && response !== 'Error -- fethingSubPath from api.js') {
        return response
    }
})

export const putDataEducation = createAsyncThunk('education/putDataSummary', async (data) => {
    const response = await fetchAPI.putDataToWholeSection(data.user, data.path, data.value);
    if (response && response.status == 200) {
        return data.value
    }
});