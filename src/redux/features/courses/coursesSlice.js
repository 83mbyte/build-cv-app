import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { dbAPI } from "../../../api/api";

const DATA_TEMPLATE_OBJECT = {
    course: '',
    institution: '',
    period: '',
    link: ''
}


const coursesSlice = createSlice({
    name: 'courses',
    initialState: {
        data: [],
        __serv: { isSectionVisible: true },
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
        coursesVisibleToggler: (state) => {
            state.__serv.isSectionVisible = !state.__serv.isSectionVisible;
        }
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


export default coursesSlice.reducer;
export const { addCoursesItem, removeCoursesItem, inputCoursesUpdate, coursesVisibleToggler } = coursesSlice.actions;

export const getCourses = createAsyncThunk('courses/getCourses', async (obj) => {
    let resp = await dbAPI.getSectionData('courses', obj.userId);
    if (resp) {
        return resp;
    } else {
        return null
    }
})