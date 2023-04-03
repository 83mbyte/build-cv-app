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
        modalWindow: {
            isOpen: false
        },
        isModifiedContent: {
            status: false,
            sections: []
        }
    },
    reducers: {
        clearAuthError: (state) => {
            state.auth.error = '';
            state.auth.status = '';
            state.auth.successMsg = '';
        },
        addLoggedUser: (state, action) => {
            state.auth.status = 'ready';
            state.auth.data = action.payload;
        },
        modalIsOpenToggle: (state) => {
            state.modalWindow.isOpen = !state.modalWindow.isOpen;
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
    }
})

export const { clearAuthError, addLoggedUser, modalIsOpenToggle, setIsModifiedContent } = utilitySlice.actions;

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

export const putDataOnServerThunk = createAsyncThunk('utility/putDataOnServer', async (dataObj) => {
    let resp = await dbAPI.putDataToSection(dataObj.user, dataObj.section, dataObj.data);

    if (resp.ok && resp.status === 200) {
        return dataObj.section
    } else {
        return null
    }
})