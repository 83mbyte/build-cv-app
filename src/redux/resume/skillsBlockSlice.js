import { createSlice } from "@reduxjs/toolkit";
import { uid } from 'uid/single';

const skillsItemDefault = { id: 'init_skills', value: 'Enter skill' };

export const skillsBlockSlice = createSlice({
    name: 'resumeSkills',
    initialState: {
        isVisible: true,
        skillsHeading: null,
        showAddRemoveButtons: {
            id: null,
            show: false,
        },
        items: [skillsItemDefault, { id: 'init_skills2', value: 'Enter skill' }]
    },
    reducers: {
        setResumeSkillsHeading: (state, action) => {
            return {
                ...state,
                [action.payload.name]: action.payload.value
            }
        },
        setResumeSkillsIsVisible: (state, action) => {
            if (action.payload) {
                return {
                    ...state,
                    isVisible: action.payload.show
                }
            }
        },

        setSkillItemData: (state, action) => {
            if (!action.payload) {
                return { ...state }
            }
            let index = state.items.findIndex((item,) => item.id == action.payload.id);
            state.items[index]['value'] = action.payload.value;
        },

        // add more skills items
        addSkillItem: (state) => {
            return {
                ...state,
                items: [...state.items, {
                    ...skillsItemDefault,
                    id: uid(8)
                }]
            }
        },
        // remove skills item
        removeSkillItem: (state, action) => {
            if (!action.payload) {
                return { ...state }
            }

            let updatedItems = (state.items).filter((item) => item.id != action.payload);

            return {
                ...state,
                items: updatedItems.length > 0 ? updatedItems : [{ ...skillsItemDefault, id: uid(8) }]
            }
        },
    }
})

export const { setResumeSkillsHeading, setResumeSkillsIsVisible, setSkillItemData, addSkillItem, removeSkillItem, } = skillsBlockSlice.actions;
export default skillsBlockSlice.reducer;