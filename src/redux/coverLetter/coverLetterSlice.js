import { createSlice } from "@reduxjs/toolkit";


export const coverLetterSlice = createSlice({
    name: 'coverLetter',
    initialState: {
        position: null,
        companyName: null,
        skills: null,
        experience: 'Beginner',
        language: 'English',
        coverLetterText: null,
        isLoading: false
    },
    reducers: {
        setCoverLetterText: (state, action) => {
            if (action.payload) {
                return {
                    ...state,
                    coverLetterText: action.payload.value ?? null
                }
            }
        },
        setCoverLetterFields: (state, action) => {
            if (action.payload) {
                return {
                    ...state,
                    [action.payload.field]: action.payload.value
                }
            }
        },
        setIsLoadingCoverLetter: (state, action) => {
            return {
                ...state,
                isLoading: action.payload ?? false
            }
        }

    }
});


export const { setCoverLetterText, setCoverLetterFields, setIsLoadingCoverLetter } = coverLetterSlice.actions;
export default coverLetterSlice.reducer;