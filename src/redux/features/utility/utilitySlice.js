import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchAPI } from "../../../API/api";

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
        setIsModifiedFalse: (state) => {
            state.data.isModified.status = false;
            state.data.isModified.sections = [];
        }

    },
    extraReducers(builder) {
        builder
            .addCase(putDataOnServer.fulfilled, (state, action) => {
                let index = state.data.isModified.sections.indexOf(action.payload);
                if (index !== -1) {
                    state.data.isModified.sections.splice(index, 1);
                    if (state.data.isModified.sections.length == 0) {
                        state.data.isModified.status = false;
                    }
                }
            })
    }

})

export const { setIsModifiedTrue, setIsModifiedFalse } = utilitySlice.actions;
export default utilitySlice.reducer;

export const putDataOnServer = createAsyncThunk('utility/putDataOnServer', async (data) => {
    const response = await fetchAPI.putDataToWholeSection(data.user, data.path, data.value);
    if (response.ok && response.status === 200) {
        return data.path
    }
})