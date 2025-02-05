import { createSlice } from "@reduxjs/toolkit";

export const contactBlockSlice = createSlice({
    name: 'resumeContact',
    initialState: {
        phone: null,
        email: null,
        location: null,
        web: null,
    },
    reducers: {
        setResumeContactData: (state, action) => {

            return {
                ...state,
                [action.payload.name]: action.payload.value
            }
        }
    }
})

export const { setResumeContactData } = contactBlockSlice.actions;
export default contactBlockSlice.reducer;