import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchAPI } from "../../../API/api";

const DATA_TEMPLATE_OBJECT = {
    skill: {
        label: 'Skill',
        path: 'skills/skill',
        type: 'text',
        value: ''
    },
    level: {
        label: 'Level',
        path: 'skills/level',
        type: 'slider',
        value: ''
    }
}

export const skillsSlice = createSlice({
    name: 'skills',
    initialState: {
        data: [DATA_TEMPLATE_OBJECT],
        status: 'idle',
        error: ''
    },
    reducers: {
        addNewSkillItem: (state) => {
            state.data = [...state.data, DATA_TEMPLATE_OBJECT];
        },
        removeSkillItem: (state, action) => {
            state.data.splice(action.payload, 1);
            if (state.data.length < 1) {
                state.data = [DATA_TEMPLATE_OBJECT]
            }
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchSkills.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchSkills.fulfilled, (state, action) => {
                state.status = 'succeeded';
                if (action.payload) {
                    state.data = action.payload
                } else {
                    state.data = [DATA_TEMPLATE_OBJECT]
                }
            })
            .addCase(fetchSkills.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
    }
})
export const { addNewSkillItem, removeSkillItem } = skillsSlice.actions;
export default skillsSlice.reducer;


export const fetchSkills = createAsyncThunk('skills/fetchSkills', async (userName) => {
    const response = await fetchAPI.fethingSubPath('skills', userName);
    if (response && response !== 'Error -- fethingSubPath from api.js') {
        return response;
    }
})
