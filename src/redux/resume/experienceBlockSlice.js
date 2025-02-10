import { createSlice } from "@reduxjs/toolkit";
import { uid } from 'uid/single';


const experienceItemDefault = {
    id: 'init_experience',
    employer: null,
    position: null,
    description: null,
    period: null,
}

export const experienceBlockSlice = createSlice({
    name: 'resumeExperience',
    initialState: {
        expHeading: null,
        isVisible: true,
        items: [
            experienceItemDefault
        ],

    },

    reducers: {
        setResumeExperienceHeading: (state, action) => {
            return {
                ...state,
                [action.payload.name]: action.payload.value
            }
        },
        setResumeExperienceIsVisible: (state, action) => {
            if (action.payload) {
                return {
                    ...state,
                    isVisible: action.payload.show
                }
            }
        },

        setExpItemData: (state, action) => {
            if (!action.payload) {
                return { ...state }
            }
            let index = state.items.findIndex((item, index) => item.id == action.payload.id);
            state.items[index][action.payload.name] = action.payload.value;
        },
        // add more exp items
        addExpItem: (state) => {
            return {
                ...state,
                items: [...state.items, {
                    ...experienceItemDefault,
                    id: uid(8)
                }]
            }
        },
        // remove exp item
        removeExpItem: (state, action) => {
            if (!action.payload) {
                return { ...state }
            }
            let updatedItems = (state.items).filter((item) => item.id != action.payload);

            return {
                ...state,
                items: updatedItems.length > 0 ? updatedItems : [{ ...experienceItemDefault, id: uid(8) }]
            }
        },
    }
})

export const { setResumeExperienceHeading, setResumeExperienceIsVisible, setExpItemData, addExpItem, removeExpItem } = experienceBlockSlice.actions;
export default experienceBlockSlice.reducer;