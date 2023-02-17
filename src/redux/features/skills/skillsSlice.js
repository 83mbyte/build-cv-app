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
        value: 'Skillful',
    }
}

export const skillsSlice = createSlice({
    name: 'skills',
    initialState: {
        data: [],
        skillVars: ['Java', 'HTML', 'Python', 'PHP', 'CSS', 'SQL', 'HTML & CSS', 'MySQL', 'jQuery', 'C++', 'HTML', 'JavaScript', 'React', 'Redux', 'React Native', 'Firebase', 'Git', 'SaaS'],
        isSwitchChecked: false,
        isSectionVisible: false,
        status: 'idle',
        error: ''
    },
    reducers: {
        addNewSkillItem: (state) => {
            state.data = [...state.data, DATA_TEMPLATE_OBJECT];
        },
        addNewSkillItemPredefined: (state, action) => {
            state.data = [...state.data, {
                ...DATA_TEMPLATE_OBJECT,
                skill: {
                    ...DATA_TEMPLATE_OBJECT.skill,
                    value: action.payload.value
                }
            }];
            state.skillVars.splice(action.payload.index, 1);
        },
        removeSkillItem: (state, action) => {
            state.data.splice(action.payload, 1);
            if (state.data.length < 1) {
                state.data = []
            }
        },
        skillsStateValueUpdate: (state, action) => {
            state.data[action.payload.path[0]][action.payload.path[1]].value = action.payload.value;
        },
        skillLevelSwitchToggle: (state) => {
            state.isSwitchChecked = !state.isSwitchChecked;
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchSkills.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchSkills.fulfilled, (state, action) => {
                state.status = 'succeeded';
                if (action.payload && action.payload.data) {
                    state.data = action.payload.data;
                    state.isSwitchChecked = action.payload.__serv.isSwitchChecked;
                    state.isSectionVisible = action.payload.__serv.isSectionVisible;
                } else {
                    state.data = []
                }
            })
            .addCase(fetchSkills.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
    }
})
export const { addNewSkillItem, removeSkillItem, skillsStateValueUpdate, addNewSkillItemPredefined, skillLevelSwitchToggle } = skillsSlice.actions;
export default skillsSlice.reducer;


export const fetchSkills = createAsyncThunk('skills/fetchSkills', async (userName) => {
    const response = await fetchAPI.fethingSubPath('skills', userName);

    if (response && response !== 'Error -- fethingSubPath from api.js') {
        return response;
    }
})
