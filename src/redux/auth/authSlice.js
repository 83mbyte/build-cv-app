
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
            } else {
                return {
                    ...state,
                    data: null
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
    extraReducers(builder) {
        builder
            .addCase(getSubscriptionDetailsThunk.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getSubscriptionDetailsThunk.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(getSubscriptionDetailsThunk.fulfilled, (state, action) => {


                if (action?.payload) {
                    state.status = 'ready';
                    if (action.payload.data) {
                        state.data = {
                            ...state.data,
                            subscription: {
                                ...action.payload.data
                            }
                        };
                        state.error = '';
                    } else {
                        state.error = action.payload.message;
                    }
                } else {
                    state.status = 'failed';
                    state.error = 'no customer id'
                }
            })
    }
})

export default authSlice.reducer;
export const { setShowAuthModal, setAuthFormFieldError, setAuthUserData, setAuthStatus, setAuthFormData, setSubscriptionSignTempData } = authSlice.actions;


// =============== //
//   THUNKs        // 
// =============== //



export const getSubscriptionDetailsThunk = createAsyncThunk('getSubscriptionDetailsThunk', async ({ userId, accessToken }) => {
    try {
        const resp = await fetch(`${process.env.NEXT_PUBLIC_APP_DOMAIN}/getSubscriptionDetails`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId, accessToken }),
        });


        if (resp) {
            let data = await resp.json();
            return { data };
        } else {
            throw new Error('no subscription details received')
        }

    } catch (error) {
        return null
    }

})