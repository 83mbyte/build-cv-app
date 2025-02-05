import { createSlice } from "@reduxjs/toolkit";

export const headerBlockSlice = createSlice({
    name: 'resumeHeader',
    initialState: {
        fullName: null,
        position: 'position'
    },
    reducers: {
        setResumeHeaderData: (state, action) => {

            return {
                ...state,
                [action.payload.name]: action.payload.value
            }
        }
    }
})

export const { setResumeHeaderData } = headerBlockSlice.actions;
export default headerBlockSlice.reducer;