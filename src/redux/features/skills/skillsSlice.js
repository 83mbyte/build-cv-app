import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { dbAPI } from "../../../api/api";

const DATA_TEMPLATE_OBJECT = {
    label: '',
    level: 3
}

const skillsSlice = createSlice({
    name: 'skills',
    initialState: {
        data: [DATA_TEMPLATE_OBJECT],
        __serv: { isSectionVisible: true, isSwitchChecked: false },
        status: 'idle',
        error: ''
    },
    reducers: {
        inputSkillsUpdate: (state, action) => {
            state.data[action.payload.arrayIndex][action.payload.inputName] = action.payload.value;
        },
        removeSkillsItem: (state, action) => {
            state.data.splice(action.payload, 1);
            if (state.data.length < 1) {
                state.data = []
            }
        },
        addSkillsItem: (state, action) => {
            if (!action.payload) {
                state.data = [...state.data, DATA_TEMPLATE_OBJECT]
            } else {
                state.data = [...state.data, { label: action.payload.label, level: action.payload.level }]
            }
        },
        toggleSkillsSwitch: (state) => {
            state.__serv.isSwitchChecked = !state.__serv.isSwitchChecked;
        }
    },
    extraReducers(builder) {
        builder
            .addCase(getSkills.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(getSkills.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(getSkills.fulfilled, (state, action) => {
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

export default skillsSlice.reducer;
export const { removeSkillsItem, inputSkillsUpdate, addSkillsItem, toggleSkillsSwitch } = skillsSlice.actions;

export const getSkills = createAsyncThunk('skills/getSkills', async (obj) => {
    let resp = await dbAPI.getSectionData('skills', obj.userId);
    if (resp) {
        return resp;
    } else {
        return null
    }
})