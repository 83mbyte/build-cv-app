import { createSlice } from "@reduxjs/toolkit";

const UTILITY_DATA_TEMPLATE = {
    isModified: {
        status: false,
        sections: []
    }
}

const utilitySlice = createSlice({
    name: 'utility',
    initialState: {
        data: UTILITY_DATA_TEMPLATE
    },
    reducers: {

        setIsModifiedTrue: (state, action) => {
            if (!state.data.isModified.sections.includes(action.payload.section)) {
                state.data.isModified.status = true;
                state.data.isModified.sections = [...state.data.isModified.sections, action.payload.section];
            }
        },
        setIsModifiedFalse: (state,) => {
            state.data.isModified.status = false;
            state.data.isModified.sections = [];
        }

    }
})

export const { setIsModifiedTrue, setIsModifiedFalse } = utilitySlice.actions;
export default utilitySlice.reducer;