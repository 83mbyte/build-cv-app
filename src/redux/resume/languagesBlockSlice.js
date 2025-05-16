import { createSlice } from "@reduxjs/toolkit";
import { uid } from 'uid/single';

const languagesItemDefault = { id: 'init_languages', value: 'Enter language' };

export const languagesBlockSlice = createSlice({
    name: 'resumeLanguages',
    initialState: {
        isVisible: true,
        languagesHeading: null,
        items: [languagesItemDefault]
    },
    reducers: {
        setResumeLanguagesHeading: (state, action) => {
            return {
                ...state,
                [action.payload.name]: action.payload.value
            }
        },
        setResumeLanguagesIsVisible: (state, action) => {
            if (action.payload) {
                return {
                    ...state,
                    isVisible: action.payload.show
                }
            }
        },

        setLanguagesItemData: (state, action) => {
            if (!action.payload) {
                return { ...state }
            }
            let index = state.items.findIndex((item,) => item.id == action.payload.id);
            state.items[index]['value'] = action.payload.value;
        },

        // add more skills items
        addLanguagesItem: (state) => {
            return {
                ...state,
                items: [...state.items, {
                    ...languagesItemDefault,
                    id: uid(8)
                }]
            }
        },
        // remove skills item
        removeLanguagesItem: (state, action) => {
            if (!action.payload) {
                return { ...state }
            }

            let updatedItems = (state.items).filter((item) => item.id != action.payload);

            return {
                ...state,
                items: updatedItems.length > 0 ? updatedItems : [{ ...languagesItemDefault, id: uid(8) }]
            }
        },
    }
})

export const { setResumeLanguagesHeading, setResumeLanguagesIsVisible, setLanguagesItemData, setShowAddLanguagesButtons, addLanguagesItem, removeLanguagesItem, } = languagesBlockSlice.actions;
export default languagesBlockSlice.reducer;