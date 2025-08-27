import { createSlice } from "@reduxjs/toolkit";
import { getResumeDataThunk } from "../persistence/persistenceSlice";
export const headerBlockSlice = createSlice({
    name: 'resumeHeader',
    initialState: {
        fullName: null,
        position: null,
        profileImage: null,
    },
    reducers: {
        setResumeHeaderData: (state, action) => {

            return {
                ...state,
                [action.payload.name]: action.payload.value
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getResumeDataThunk.fulfilled, (state, action) => {
            if (action.payload && action.payload.resumeHeader) {
                return { ...state, ...action.payload.resumeHeader };
            }
        });
    }
})

export const { setResumeHeaderData } = headerBlockSlice.actions;
export default headerBlockSlice.reducer;