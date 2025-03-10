
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: 'auth',
    initialState: {

        authModal: {
            show: false,
            type: 'signup'
        },
        formErrors: {
            email: null,
            password: null
        },
        formData: {
            email: null,
            address: null,
            firstName: null,
            lastName: null
        },
        data: null,
        status: '',
        error: '',
        successMsg: ''

    },
    reducers: {
        setShowAuthModal: (state, action) => {
            if (action.payload) {

                return {
                    ...state,
                    authModal: {
                        show: action.payload?.show ? action.payload.show : null,
                        type: action.payload?.type ? action.payload.type : null

                    }
                }
            }
        },
        setAuthFormFieldError: (state, action) => {
            if (action.payload) {
                return {
                    ...state,
                    formErrors: {
                        ...state.formErrors,
                        [action.payload.field]: action.payload.errorText
                    }
                }
            } else {
                return {
                    ...state,
                    formErrors: {
                        email: null,
                        password: null
                    }
                }
            }
        },
        setAuthFormData: (state, action) => {
            return {
                ...state,
                formData: { ...action.payload }
            }
        },
        setAuthUserData: (state, action) => {
            if (action.payload) {
                return {
                    ...state,
                    data: { ...action.payload }
                }
            }
        },
        setAuthStatus: (state, action) => {
            if (action.payload) {
                return {
                    ...state,
                    status: action.payload ?? null
                }
            }
        },


    },


})

export default authSlice.reducer;
export const { setShowAuthModal, setAuthFormFieldError, setAuthUserData, setAuthStatus, setAuthFormData } = authSlice.actions;


// =============== //
//   THUNKs        // 
// =============== //



export const signUpThunk = createAsyncThunk('authSlice/signUpThunk', async (dataObj) => {

    // let resp = await authAPI.signUp(dataObj.email, dataObj.password, dataObj.firstName, dataObj.lastName);
    if (resp) {
        return resp
    } else {
        return null
    }
})

