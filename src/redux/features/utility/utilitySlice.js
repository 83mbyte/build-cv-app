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
        coverLettDrawer: {
            isOpen: false,
            type: null
        },
        interviewDrawer: {
            isOpen: false,
            type: null
        },
        isModifiedContent: {
            status: false,
            sections: []
        },
        additionalSections: {
            data: [],
            modified: false,
            status: 'idle',
            error: ''
        }

    },
    reducers: {
        menuDrawerIsOpenToggle: (state) => {
            state.menuDrawer.isOpen = !state.menuDrawer.isOpen;
        },
        previewDrawerIsOpenToggle: (state) => {
            state.previewDrawer.isOpen = !state.previewDrawer.isOpen
        },
        coverLettDrawerIsOpenToggle: ((state, action) => {
            if (action?.payload) {
                state.coverLettDrawer.isOpen = true;
                state.coverLettDrawer.type = action.payload.type;

            } else {
                state.coverLettDrawer.isOpen = false;
                state.coverLettDrawer.type = null;
            }
        }),
        interviewDrawerIsOpenToggle: (state) => {
            state.interviewDrawer.isOpen = !state.interviewDrawer.isOpen;
        },
        setIsModifiedContent: (state, action) => {
            state.isModifiedContent.status = action.payload.status;
            if (!state.isModifiedContent.sections.includes(action.payload.section)) {
                state.isModifiedContent.sections = [...state.isModifiedContent.sections, action.payload.section]
            }
        },
        additionalSectionAdd: (state, action) => {
            state.additionalSections.data = [...state.additionalSections.data, action.payload];
            state.additionalSections.modified = true;
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

            .addCase(putAdditionalSectionsOnServerThunk.pending, (state) => {
                state.additionalSections.status = 'loading';
            })
            .addCase(putAdditionalSectionsOnServerThunk.rejected, (state, action) => {
                state.additionalSections.status = 'failed';
                if (action?.error?.message) {
                    state.additionalSections.error = action.error.message;
                }
            })
            .addCase(putAdditionalSectionsOnServerThunk.fulfilled, (state, action) => {
                state.additionalSections.status = 'ready';
                if (action.payload !== null) {
                    state.additionalSections.data = action.payload;
                    state.additionalSections.modified = false;
                }
            })

            .addCase(getAdditionalSections.pending, (state) => {
                state.additionalSections.status = 'loading';
            })
            .addCase(getAdditionalSections.rejected, (state, action) => {
                state.additionalSections.status = 'failed';
                if (action?.error?.message) {
                    state.additionalSections.error = action.error.message;
                }
            })
            .addCase(getAdditionalSections.fulfilled, (state, action) => {
                state.additionalSections.status = 'ready';
                if (action.payload !== null) {
                    state.additionalSections.data = action.payload;
                }
            })
    }

})


export default utilitySlice.reducer;
export const { menuDrawerIsOpenToggle, previewDrawerIsOpenToggle, coverLettDrawerIsOpenToggle, setIsModifiedContent, additionalSectionAdd, interviewDrawerIsOpenToggle } = utilitySlice.actions;

export const putDataOnServerThunk = createAsyncThunk('utility/putDataOnServer', async (dataObj) => {
    // put/save data on server..
    let resp = await dbAPI.putDataToSection(dataObj.user, dataObj.section, dataObj.token, dataObj.data);

    if (resp.ok && resp.status === 200) {
        return dataObj.section
    } else {
        return null
    }
});

export const putAdditionalSectionsOnServerThunk = createAsyncThunk('utility/putAdditionalSectionsOnServerThunk', async (dataObj) => {
    let resp = await dbAPI.putDataToSection(dataObj.user, 'utility/additionalSections/data', dataObj.token, dataObj.data,);

    if (resp.ok && resp.status === 200) {
        return dataObj.data
    } else {
        return null
    }
});

export const getAdditionalSections = createAsyncThunk('utility/getAdditionalSections', async (obj) => {
    let resp = await dbAPI.getSectionData('utility/additionalSections/data', obj.userId, obj.accessToken);

    if (resp) {
        return resp;
    } else {
        return null
    }
});