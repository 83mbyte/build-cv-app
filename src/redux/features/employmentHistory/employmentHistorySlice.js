import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchAPI } from "../../../API/api";

const DATA_TEMPLATE_OBJECT = {
    title: {
        label: 'Job title',
        path: 'employmentHistory/title',
        type: 'text',
        required: true,
        value: ''
    },
    period: {
        label: 'Start - End date',
        path: 'employmentHistory/period',
        type: 'text',
        value: ''
    },
    employer: {
        label: 'Employer',
        path: 'employmentHistory/employer',
        type: 'text',
        required: true,
        value: ''
    },
    location: {
        label: 'Location',
        path: 'employmentHistory/location',
        type: 'text',
        value: ''
    },
    wysiwyg: {
        label: 'Description',
        path: 'employmentHistory/wysiwyg',
        type: 'wysiwyg',
        value: ''
    },
}

export const employmentHistorySlice = createSlice({
    name: 'employmentHistory',
    initialState: {
        data: [],
        status: 'idle',
        isSectionVisible: false,
        error: ''
    },
    reducers: {
        addNewEmpHistoryItem: (state, action) => {
            state.data = [...state.data, DATA_TEMPLATE_OBJECT];
        },
        removeEmpHistoryItem: (state, action) => {
            state.data.splice(action.payload, 1);
            if (state.data.length < 1) {
                state.data = []
            }
        },
        empHistoryStateValueUpdate: (state, action) => {
            state.data[action.payload.path[0]][action.payload.path[1]].value = action.payload.value;
        },
    },
    extraReducers(builder) {
        builder
            .addCase(fetchEmploymentHistory.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(fetchEmploymentHistory.fulfilled, (state, action) => {
                state.status = 'succeeded';
                if (action.payload.data) {
                    state.data = action.payload.data;
                    state.isSectionVisible = action.payload.__serv.isSectionVisible;

                } else {
                    state.data = [];
                    state.isSectionVisible = false;
                }
            })
            .addCase(fetchEmploymentHistory.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
    }

})

export default employmentHistorySlice.reducer;
export const { addNewEmpHistoryItem, removeEmpHistoryItem, empHistoryStateValueUpdate } = employmentHistorySlice.actions;


export const fetchEmploymentHistory = createAsyncThunk('employmentHistory/fetchEmploymentHistory', async (userName) => {
    const response = await fetchAPI.fethingSubPath('employmentHistory', userName);
    if (response && response !== 'Error -- fethingSubPath from api.js') {
        return response;
    }
})