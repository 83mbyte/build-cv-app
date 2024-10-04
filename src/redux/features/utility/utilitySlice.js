import { dbAPI } from "@/lib/dbAPI";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


const utilitySlice = createSlice({
    name: 'utility',
    initialState: {
        menuDrawer: {
            isOpen: false
        },
        previewDrawer: {
            isOpen: false,
        },
        isModifiedContent: {
            status: false,
            sections: []
        },

    },
    reducers: {
        menuDrawerIsOpenToggle: (state) => {
            state.menuDrawer.isOpen = !state.menuDrawer.isOpen;
        },
        previewDrawerIsOpenToggle: (state) => {
            state.previewDrawer.isOpen = !state.previewDrawer.isOpen
        },
        setIsModifiedContent: (state, action) => {
            state.isModifiedContent.status = action.payload.status;
            if (!state.isModifiedContent.sections.includes(action.payload.section)) {
                state.isModifiedContent.sections = [...state.isModifiedContent.sections, action.payload.section]
            }
        },
    },
    extraReducers(builder) {
        builder
            .addCase(putDataOnServerThunk.fulfilled, (state, action) => {
                if (action.payload !== null) {
                    let index = state.isModifiedContent.sections.indexOf(action.payload);
                    if (index !== -1) {
                        state.isModifiedContent.sections.splice(index, 1);
                        if (state.isModifiedContent.sections.length < 1) {
                            state.isModifiedContent.status = false
                        }
                    }
                }
            })
    }

})


export default utilitySlice.reducer;
export const { menuDrawerIsOpenToggle, previewDrawerIsOpenToggle, setIsModifiedContent } = utilitySlice.actions;

export const putDataOnServerThunk = createAsyncThunk('utility/putDataOnServer', async (dataObj) => {
    // put/save data on server..
    let resp = await dbAPI.putDataToSection(dataObj.user, dataObj.section, dataObj.token, dataObj.data);

    if (resp.ok && resp.status === 200) {
        return dataObj.section
    } else {
        return null
    }
})