import { authAPI } from "@/lib/authAPI";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


const authSlice = createSlice({
    name: 'auth',
    initialState: {
        auth: {
            data: null,
            status: '',
            error: '',
            successMsg: ''
        },

    },

    reducers: {
        clearAuthError: (state) => {
            state.auth.error = '';
            state.auth.status = '';
            state.auth.successMsg = '';
        },
        setAuthFormError: (state, action) => {
            console.log('action ', action)
            state.auth.error = action.payload.message;
        },
        setLoggedUser: (state, action) => {
            state.auth.error = '';
            state.auth.status = '';
            state.auth.successMsg = '';
            state.auth.data = action?.payload ? action.payload : null;

        }
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
                        case 'verify-email':
                            state.auth.error = '';
                            state.auth.successMsg = `Thank you. You need to verify your email address to complete registration. Please follow an activation link we sent you (${action.payload.userEmail}).`;
                            break;

                        default:
                            state.auth.error = 'We are unable to register your account. Possible reason: ' + action.payload.message;
                            state.auth.successMsg = '';
                            break;
                    }
                }
            })
            .addCase(signInThunk.pending, (state) => {
                state.auth.status = 'loading';
            })
            .addCase(signInThunk.rejected, (state, action) => {
                state.auth.status = 'failed';
                state.auth.error = action.error.message;
            })
            .addCase(signInThunk.fulfilled, (state, action) => {

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

            // Google SignIn
            .addCase(signInGoogleThunk.pending, (state) => {
                state.auth.status = 'loading';
            })
            .addCase(signInGoogleThunk.rejected, (state, action) => {
                state.auth.status = 'failed';
                state.auth.error = action.error.message;
            })
            .addCase(signInGoogleThunk.fulfilled, (state, action) => {
                console.log('signInGoogleThunk.fulfilled, ACTION:', action)
                state.auth.status = 'ready';
                if (action?.payload) {
                    if (action.payload.data) {
                        state.auth.data = action.payload.data;
                        state.auth.error = '';
                    } else {
                        state.auth.data = null;
                        state.auth.error = action.payload.message;
                    }
                }
            })

    }
})

export default authSlice.reducer;
export const { clearAuthError, setAuthFormError, setLoggedUser } = authSlice.actions;



// =============== //
//   THUNKs        // 
// =============== //

export const signUpThunk = createAsyncThunk('authSlice/signUpUser', async (dataObj) => {

    let resp = await authAPI.signUp(dataObj.email, dataObj.password, dataObj.firstName, dataObj.lastName);
    if (resp) {
        return resp
    } else {
        return null
    }
})


export const signInThunk = createAsyncThunk('authSlice/signInUser', async (dataObj) => {

    let resp = await authAPI.signIn(dataObj.email, dataObj.password);
    if (resp) {
        return resp
    } else {
        return null
    }
})

export const signInGoogleThunk = createAsyncThunk('authSlice/signInGoogleThunk', async (initial = true) => {
    let resp = await authAPI.signInGoogle(initial);
    if (resp) {
        return resp;
    } else {
        return null
    }
})