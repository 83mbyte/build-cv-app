import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { authAPI, dbAPI } from "../../../api/api";

const utilitySlice = createSlice({
    name: 'utility',
    initialState: {
        auth: {
            data: null,
            status: '',
            error: '',
            successMsg: ''
        },
        drawer: {
            isOpen: false
        },
        previewDrawer: {
            isOpen: false
        },
        isModifiedContent: {
            status: false,
            sections: []
        },
        additionalSections: {
            data: [],
            status: 'idle',
            error: ''
        }
    },
    reducers: {
        additionalSectionAdd: (state, action) => {
            state.additionalSections.data = [...state.additionalSections.data, action.payload];
        },

        clearAuthError: (state) => {
            state.auth.error = '';
            state.auth.status = '';
            state.auth.successMsg = '';
        },
        addLoggedUser: (state, action) => {
            state.auth.status = 'ready';
            state.auth.data = action.payload;
        },
        drawerIsOpenToggle: (state) => {
            state.drawer.isOpen = !state.drawer.isOpen;
        },
        previewDrawerIsOpenToggle: (state) => {
            state.previewDrawer.isOpen = !state.previewDrawer.isOpen;
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
            .addCase(signUpThunk.pending, (state) => {
                state.auth.status = 'loading';
            })
            .addCase(signUpThunk.rejected, (state, action) => {
                state.auth.status = 'failed';
                state.auth.error = action.error.message;
            })
            .addCase(signUpThunk.fulfilled, (state, action) => {
                state.auth.status = 'ready';
                if (action.payload) {
                    switch (action.payload.message) {
                        case 'verify':
                            state.auth.error = '';
                            state.auth.successMsg = 'Thank you. You need to verify your email address to complete registration. Please follow an activation link we sent you.';
                            break;

                        default:
                            state.auth.error = 'We are unable to register your account. Possible reason: ' + action.payload.message;
                            state.auth.successMsg = '';
                            break;
                    }
                }
            })

            .addCase(logInThunk.pending, (state) => {
                state.auth.status = 'loading';
            })
            .addCase(logInThunk.rejected, (state, action) => {
                state.auth.status = 'failed';
                state.auth.error = action.error.message;
            })
            .addCase(logInThunk.fulfilled, (state, action) => {
                state.auth.status = 'ready';
                if (action.payload) {
                    if (action.payload.data) {
                        state.auth.data = action.payload.data;
                        state.auth.error = '';
                    } else {
                        state.auth.data = null;
                        switch (action.payload.message) {
                            case 'not verified':
                                state.auth.error = 'You need to verify your email address. Please follow a verification link we sent you.';
                                break;
                            case 'wrong credentials':
                                state.auth.error = 'There was an error processing your request. Check your Email/Password.';
                                break;
                            default:
                                state.auth.error = action.payload.message;
                                break;
                        }
                    }

                }
            })
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

            .addCase(authLogout.pending, (state) => {
                state.auth.status = 'loading';
            })
            .addCase(authLogout.rejected, (state, action) => {
                state.auth.status = 'failed'
                state.auth.error = action.error.message;
            })
            .addCase(authLogout.fulfilled, (state, action) => {
                state.auth.status = 'ready';
                if (action.payload) {
                    switch (action.payload.message) {
                        case 'logged out':
                            state.auth.error = '';
                            state.auth.successMsg = ''
                            state.auth.data = null;
                            break;

                        default:
                            state.auth.error = 'Logout error. Possible reason: ' + action.payload.message;
                            state.auth.successMsg = '';
                            break;
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

            .addCase(signInGoogleThunk.pending, (state) => {
                state.auth.status = 'loading';
            })
            .addCase(signInGoogleThunk.rejected, (state, action) => {
                state.auth.status = 'failed';
                state.auth.error = action.error.message;
            })
            .addCase(signInGoogleThunk.fulfilled, (state, action) => {
                state.auth.status = 'ready';
                if (action?.payload) {
                    if (action.payload.data) {
                        state.auth.data = action.payload.data;
                        state.auth.error = '';
                    } else {
                        state.auth.data = null;
                        switch (action.payload.message) {
                            case 'not verified':
                                state.auth.error = 'You need to verify your email address. Please follow a verification link we sent you.';
                                break;
                            case 'wrong credentials':
                                state.auth.error = 'There was an error processing your request. Check your Email/Password.';
                                break;
                            default:
                                state.auth.error = action.payload.message;
                                break;
                        }
                    }

                }
            })
    }
})

export const { clearAuthError, addLoggedUser, drawerIsOpenToggle, setIsModifiedContent, additionalSectionAdd, previewDrawerIsOpenToggle } = utilitySlice.actions;

export default utilitySlice.reducer;

export const signUpThunk = createAsyncThunk('utilitySlice/signUpUser', async (dataObj) => {
    let resp = await authAPI.signUp(dataObj.email, dataObj.pass, dataObj.firstName, dataObj.lastName);
    if (resp) {
        return resp
    } else {
        return null
    }
})

export const logInThunk = createAsyncThunk('utility/logInThunk', async (dataObj) => {
    let resp = await authAPI.logIn(dataObj.email, dataObj.pass);
    if (resp) {
        return resp;
    } else {
        return null
    }
})

export const signInGoogleThunk = createAsyncThunk('utility/signInGoogleThunk', async (initial = true) => {
    let resp = await authAPI.signInGoogle(initial);
    if (resp) {
        return resp;
    } else {
        return null
    }
})



export const authLogout = createAsyncThunk('utility/authLogout', async () => {
    let resp = await authAPI.logOut();
    if (resp) {
        return resp;
    } else {
        return null
    }
})

export const putDataOnServerThunk = createAsyncThunk('utility/putDataOnServer', async (dataObj) => {
    let resp = await dbAPI.putDataToSection(dataObj.user, dataObj.section, dataObj.token, dataObj.data);

    if (resp.ok && resp.status === 200) {
        return dataObj.section
    } else {
        return null
    }
})

export const putAdditionalSectionsOnServerThunk = createAsyncThunk('utility/putAdditionalSectionsOnServerThunk', async (dataObj) => {
    let resp = await dbAPI.putDataToSection(dataObj.user, 'utility/additionalSections/data', dataObj.token, dataObj.data,);

    if (resp.ok && resp.status === 200) {
        return dataObj.data
    } else {
        return null
    }
})

export const getAdditionalSections = createAsyncThunk('hobbies/getAdditionalSections', async (obj) => {
    let resp = await dbAPI.getSectionData('utility/additionalSections/data', obj.userId, obj.accessToken);

    if (resp) {
        return resp;
    } else {
        return null
    }
})