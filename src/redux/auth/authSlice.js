
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
        // key to create Stripe customer
        subscriptionSignTempData: {
            clientSecret: null
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

            return {
                ...state,
                status: action?.payload ?? null
            }
        },

        setSubscriptionSignTempData: (state, action) => {
            if (action?.payload) {
                return {
                    ...state,
                    subscriptionSignTempData: {
                        [action.payload.key]: action.payload?.value
                    }
                }
            }
        },


    },


})

export default authSlice.reducer;
export const { setShowAuthModal, setAuthFormFieldError, setAuthUserData, setAuthStatus, setAuthFormData, setSubscriptionSignTempData } = authSlice.actions;


// =============== //
//   THUNKs        // 
// =============== //



