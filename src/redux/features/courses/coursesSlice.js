import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { dbAPI } from "../../../api/api";

const DATA_TEMPLATE_OBJECT = {
    course: '',
    institution: '',
    period: '',
    cert: ''
}


const coursesSlice = createSlice({
    name: 'courses',
    initialState: {
        data: [],
        status: 'idle',
        error: ''
    },
    reducers: {
        addCoursesItem: (state) => {
            state.data = [...state.data, DATA_TEMPLATE_OBJECT]
        },
        removeCoursesItem: (state, action) => {
            state.data.splice(action.payload, 1);
            if (state.data.length < 1) {
                state.data = []
            }
        },
        inputCoursesUpdate: (state, action) => {
            state.data[action.payload.arrayIndex][action.payload.inputName] = action.payload.value;
        },

    },
    extraReducers(builder) {
        builder
            .addCase(getCourses.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(getCourses.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(getCourses.fulfilled, (state, action) => {
                state.status = 'ready';
                if (action.payload) {
                    if (action.payload.data) {
                        state.data = action.payload.data;
                    }
                }
            })
    }
})


export default coursesSlice.reducer;
export const { addCoursesItem, removeCoursesItem, inputCoursesUpdate } = coursesSlice.actions;

export const getCourses = createAsyncThunk('courses/getCourses', async (obj) => {
    let resp = await dbAPI.getSectionData('courses', obj.userId);
    if (resp) {
        return resp;
    } else {
        return null
    }
})