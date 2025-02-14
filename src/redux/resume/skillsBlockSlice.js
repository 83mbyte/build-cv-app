import { createSlice } from "@reduxjs/toolkit";
import { uid } from 'uid/single';

const skillsItemDefault = { id: 'init_skills', value: 'Enter skill' };

export const skillsBlockSlice = createSlice({
    name: 'resumeSkills',
    initialState: {
        isVisible: true,
        skillsHeading: null,
        items: [skillsItemDefault, { id: 'init_skills2', value: 'Enter skill' }],
        showAddRemoveButtons: {
            id: null,
            show: false,
        },
        assistant: {
            generatedItems: null,
            selectedItems: null
        }
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

        // assistant reducers
        setSkillsGeneratedItems: (state, action) => {
            if (action.payload && action.payload.value) {
                console.log('in reducer')
                return {
                    ...state,
                    assistant: {
                        ...state.assistant,
                        generatedItems: action.payload.value
                    }
                }
            }
        },
        addSkillsSelectedItems: (state, action) => {
            if (action.payload && action.payload.value) {

                if (!state.assistant.selectedItems) {
                    return {
                        ...state,
                        assistant: {
                            ...state.assistant,
                            selectedItems: [action.payload.value]
                        }
                    }
                } else {
                    let indexToCheck = state.assistant.selectedItems.findIndex(item => item == action.payload.value);
                    if (indexToCheck == -1) {
                        return {
                            ...state,
                            assistant: {
                                ...state.assistant,
                                selectedItems: [...state.assistant.selectedItems, action.payload.value]
                            }
                        }
                    }
                }
            }
        },
        removeSkillsSelectedItems: (state, action) => {
            if (action.payload && action.payload.value && state.assistant.selectedItems) {
                let indexToRemove = state.assistant.selectedItems.findIndex(item => item == action.payload.value);
                if (indexToRemove != -1) {
                    state.assistant.selectedItems.splice(indexToRemove, 1);
                }
            }
        },
        useSkillsSelecteditems: (state, action) => {
            if (state.assistant.selectedItems && state.assistant.selectedItems.length > 0) {
                let itemsToAdd = [];
                state.assistant.selectedItems.map(item => {
                    itemsToAdd.push({ id: uid(8), value: item });
                });
                return {
                    ...state,
                    items: [...state.items, ...itemsToAdd]
                }
            }

        }
    }
})

export const { setResumeSkillsHeading, setResumeSkillsIsVisible, setSkillItemData, addSkillItem, removeSkillItem, setSkillsGeneratedItems, addSkillsSelectedItems, removeSkillsSelectedItems, useSkillsSelecteditems } = skillsBlockSlice.actions;
export default skillsBlockSlice.reducer;