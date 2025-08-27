import { createSlice } from "@reduxjs/toolkit";
import { getResumeDataThunk } from "../persistence/persistenceSlice";

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
    },
    extraReducers: (builder) => {
        builder.addCase(getResumeDataThunk.fulfilled, (state, action) => {
            if (action.payload && action.payload.resumeContact) {
                return { ...state, ...action.payload.resumeContact };
            }
        });
    }
})

export const { setResumeContactData } = contactBlockSlice.actions;
export default contactBlockSlice.reducer;