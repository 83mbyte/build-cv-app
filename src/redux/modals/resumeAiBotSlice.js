import { createSlice } from "@reduxjs/toolkit";

export const resumeAiBotSlice = createSlice({
    name: 'resumeAiBot',
    initialState: {
        showModalAiBotContainer: {
            id: null,
            show: false
        },
        resumeExperience: {
            position: null,  //role
            generatedItems: null,   // as { someId:[item,item2,...], someId_2:[item_2,item_3,...] }
            selectedItems: null
        }
    },
    reducers: {
        setShowModalAiBotContainer: (state, action) => {
            return {
                ...state,
                showModalAiBotContainer: {
                    id: action.payload.id,
                    show: action.payload.show
                }
            }
        },
        setExperienceRole: (state, action) => {
            if (action.payload) {
                return {
                    ...state,
                    resumeExperience: {
                        ...state.resumeExperience,
                        position: action.payload.value
                    }
                }
            }
        },
        setExperienceGeneratedItems: (state, action) => {
            if (action.payload && action.payload.currentId && action.payload.value) {
                return {
                    ...state,
                    resumeExperience: {
                        ...state.resumeExperience,
                        generatedItems: {
                            ...state.resumeExperience.generatedItems,
                            [action.payload.currentId]: action.payload.value
                            // [action.payload.currentId]: action.payload.value.map((item) => `${item}_${action.payload.currentId}`) // tedfmp
                        }
                    }
                }

            }
        },

        addExperienceSelectedItems: (state, action) => {
            if (action.payload && action.payload.currentId && action.payload.value) {

                if (!state.resumeExperience.selectedItems || !state.resumeExperience.selectedItems[action.payload.currentId]) {
                    // if there is NO selections for the currenId yet
                    return {
                        ...state,
                        resumeExperience: {
                            ...state.resumeExperience,
                            selectedItems: {
                                ...state.resumeExperience.selectedItems,
                                [action.payload.currentId]: [action.payload.value]
                            }
                        }
                    }
                } else {
                    // if there is  some selections for the currenId
                    return {
                        ...state,
                        resumeExperience: {
                            ...state.resumeExperience,
                            selectedItems: {
                                ...state.resumeExperience.selectedItems,
                                [action.payload.currentId]: [...state.resumeExperience.selectedItems[action.payload.currentId], action.payload.value]
                            }
                        }
                    }
                }
            }
        },
        removeExperienceSelectedItems: (state, action) => {

            if (action.payload && action.payload.value && action.payload.currentId && state.resumeExperience.selectedItems) {
                let indexToRemove = state.resumeExperience.selectedItems[action.payload.currentId].findIndex((item) => item == action.payload.value)

                if (indexToRemove >= 0) {
                    state.resumeExperience.selectedItems[action.payload.currentId].splice(indexToRemove, 1);
                }
            }
        }
    }
})



export const { setExperienceRole, setShowModalAiBotContainer, setExperienceGeneratedItems, addExperienceSelectedItems, removeExperienceSelectedItems } = resumeAiBotSlice.actions;

export default resumeAiBotSlice.reducer;