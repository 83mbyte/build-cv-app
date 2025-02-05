import { createSlice } from "@reduxjs/toolkit";
import { uid } from 'uid/single';

const educationItem = {
    id: 'init_education',
    period: null,
    degree: null,
    institution: null,
}

export const educationBlockSlice = createSlice({
    name: 'resumeEducation',
    initialState: {
        educationHeading: null,

        items: [
            educationItem, {
                id: 'init_ed_2',
                period: null,
                degree: null,
                institution: 'univercity',
            }
        ],
    },

    reducers: {
        setResumeEducationHeading: (state, action) => {
            return {
                ...state,
                [action.payload.name]: action.payload.value
            }
        },
        addEducationItem: (state) => {
            return {
                ...state,
                items: [...state.items, {
                    ...educationItem,
                    id: uid(8)
                }]
            }
        },
        removeEducationItem: (state, action) => {
            if (!action.payload) {
                return { ...state }
            }

            let updatedItems = (state.items).filter((item) => item.id != action.payload);

            return {
                ...state,
                items: updatedItems.length > 0 ? updatedItems : [{ ...educationItem, id: uid(8) }]
            }
        },

        setEducationItemData: (state, action) => {
            if (!action.payload) {
                return { ...state }
            }
            let index = state.items.findIndex((item, index) => item.id == action.payload.id);
            state.items[index][action.payload.name] = action.payload.value;
        },
    }
})

export const { setResumeEducationHeading, addEducationItem, removeEducationItem, setEducationItemData, } = educationBlockSlice.actions;
export default educationBlockSlice.reducer;