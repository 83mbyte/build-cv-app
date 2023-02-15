import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchAPI, authAPI } from "../../../API/api";



const utilitySlice = createSlice({
    name: 'utility',
    initialState: {
        isModifiedContent: {
            status: false,
            sections: []
        },

        auth: {
            data: null,
            status: '',
            error: '',
            successMsg: ''
        }
    },
    reducers: {

        setIsModifiedTrue: (state, action) => {
            if (!state.isModifiedContent.sections.includes(action.payload.section)) {
                state.isModifiedContent.status = true;
                state.isModifiedContent.sections = [...state.isModifiedContent.sections, action.payload.section];
            }
        },
        setIsModifiedFalse: (state) => {
            state.isModifiedContent.status = false;
            state.isModifiedContent.sections = [];
        },
        clearAuthError: (state) => {
            state.auth.error = '';
            state.auth.status = '';
        },
        addLoggedUser: (state, action) => {
            state.auth.status = 'succeeded';
            state.auth.data = action.payload;

        }

    },
    extraReducers(builder) {
        builder
            .addCase(putDataOnServer.fulfilled, (state, action) => {
                let index = state.isModifiedContent.sections.indexOf(action.payload);
                if (index !== -1) {
                    state.isModifiedContent.sections.splice(index, 1);
                    if (state.isModifiedContent.sections.length == 0) {
                        state.isModifiedContent.status = false;
                    }
                }
            })
            .addCase(authLogin.pending, (state) => {
                state.auth.status = 'loading';
            })
            .addCase(authLogin.rejected, (state, action) => {
                state.auth.status = 'failed'
                state.auth.error = action.error.message;
            })
            .addCase(authLogin.fulfilled, (state, action) => {
                state.auth.status = 'succeeded';

                if (action.payload && action.payload.data && action.payload.data.userId && action.payload.data.accessToken) {
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
                            state.auth.error = 'There was an error processing your request.';
                            break;
                    }
                }
            })
            .addCase(authSignUp.pending, (state) => {
                state.auth.status = 'loading';
            })
            .addCase(authSignUp.rejected, (state, action) => {
                state.auth.status = 'failed'
                state.auth.error = action.error.message;
            })
            .addCase(authSignUp.fulfilled, (state, action) => {
                state.auth.status = 'succeeded';
                if (action.payload) {
                    switch (action.payload.message) {
                        case 'verify':
                            state.auth.error = '';
                            state.auth.successMsg = 'You need to verify your email address to complete registration. Please follow an activation link we sent you.'
                            break;

                        default:
                            state.auth.error = 'We are unable to register your account. Possible reason: ' + action.payload.message;
                            state.auth.successMsg = '';
                            break;
                    }
                }

            })
    }

})

export const { setIsModifiedTrue, setIsModifiedFalse, clearAuthError, addLoggedUser } = utilitySlice.actions;
export default utilitySlice.reducer;

export const putDataOnServer = createAsyncThunk('utility/putDataOnServer', async (data) => {
    const response = await fetchAPI.putDataToWholeSection(data.user, data.path, data.value);
    if (response.ok && response.status === 200) {
        return data.path
    }
})

export const authLogin = createAsyncThunk('utility/authLogin', async (dataObj) => {
    let resp = await authAPI.login(dataObj.auth, dataObj.email, dataObj.password);
    if (resp) {
        return resp
    } else {
        return null
    }
});

export const authSignUp = createAsyncThunk('utility/authSignUp', async (dataObj) => {
    let resp = await authAPI.signup(dataObj.auth, dataObj.email, dataObj.password);
    if (resp) {
        return resp
    } else {
        return null
    }
})