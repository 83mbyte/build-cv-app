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
        assistant: {
            position: null,  //role
            generatedItems: null,   // as { someId:[item,item2,...], someId_2:[item_2,item_3,...] }
            selectedItems: null
        }

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
        // assistants reducers
        setExperiencePositionForAssistant: (state, action) => {
            if (action.payload) {
                return {
                    ...state,
                    assistant: {
                        ...state.assistant,
                        position: action.payload.value
                    }
                }
            }
        },

        setExperienceGeneratedItems: (state, action) => {
            if (action.payload && action.payload.currentId && action.payload.value) {
                return {
                    ...state,
                    assistant: {
                        ...state.assistant,
                        generatedItems: {
                            ...state.assistant.generatedItems,
                            [action.payload.currentId]: action.payload.value
                        }
                    }
                }
            }
        },

        addExperienceSelectedItems: (state, action) => {
            if (action.payload && action.payload.currentId && action.payload.value) {

                if (!state.assistant.selectedItems || !state.assistant.selectedItems[action.payload.currentId]) {
                    // if there is NO selections for the currenId yet
                    return {
                        ...state,
                        assistant: {
                            ...state.assistant,
                            selectedItems: {
                                ...state.assistant.selectedItems,
                                [action.payload.currentId]: [action.payload.value]
                            }
                        }
                    }
                } else {
                    // if there is one selection at least for the currenId
                    return {
                        ...state,
                        assistant: {
                            ...state.assistant,
                            selectedItems: {
                                ...state.assistant.selectedItems,
                                [action.payload.currentId]: [...state.assistant.selectedItems[action.payload.currentId], action.payload.value]
                            }
                        }
                    }
                }
            }
        },
        removeExperienceSelectedItems: (state, action) => {

            if (action.payload && action.payload.value && action.payload.currentId && state.assistant.selectedItems) {
                let indexToRemove = state.assistant.selectedItems[action.payload.currentId].findIndex((item) => item == action.payload.value)

                if (indexToRemove >= 0) {
                    state.assistant.selectedItems[action.payload.currentId].splice(indexToRemove, 1);
                }
            }
        },
    }
})

export const { setResumeExperienceHeading, setResumeExperienceIsVisible, setExpItemData, addExpItem, removeExpItem, setExperiencePositionForAssistant, setExperienceGeneratedItems, addExperienceSelectedItems, removeExperienceSelectedItems } = experienceBlockSlice.actions;
export default experienceBlockSlice.reducer;