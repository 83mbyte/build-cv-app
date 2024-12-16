import { dbAPI } from "@/lib/dbAPI";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

const DATA_TEMPLATE_OBJECT = {
    label: '',
    level: 3
}

const skillsSlice = createSlice({
    name: 'skills',
    initialState: {
        data: [],
        __serv: {
            isSectionVisible: true,
            isSwitchChecked: false,
            predefined: {
                testRole: [],
            }
        },
        status: 'idle',
        error: ''
    },
    reducers: {
        inputSkillsUpdate: (state, action) => {
            state.data[action.payload.arrayIndex][action.payload.inputName] = action.payload.value;
        },

        generateSkills: (state, action) => {
            state.__serv = {
                ...state.__serv,
                predefined: {
                    ...state.__serv.predefined,
                    [action.payload.role.toLowerCase().replace(/\s/g, '')]: [...action.payload.value]
                }
            }
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
        setSkillsErrorMessage: (state, action) => {
            if (action?.payload?.message) {
                state.error = action.payload.message;
            } else {
                state.error = ''
            }
        },
        clearSkillsErrorMessage: (state) => {
            state.error = ''
        },
        toggleSkillsSwitch: (state) => {
            state.__serv.isSwitchChecked = !state.__serv.isSwitchChecked;
        },
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
                state.status = 'ready';
                if (action.payload) {

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
export const { inputSkillsUpdate, generateSkills, removeSkillsItem, addSkillsItem, setSkillsErrorMessage, clearSkillsErrorMessage, toggleSkillsSwitch } = skillsSlice.actions;

// async thunks
export const getSkills = createAsyncThunk('skills/getSkills', async (obj) => {
    let resp = await dbAPI.getSectionData('skills', obj.userId, obj.accessToken);
    if (resp) {
        return resp;
    } else {
        return null
    }
});