import { createSlice } from "@reduxjs/toolkit";

export const editorSettingsSlice = createSlice({
    name: 'editorSettings',
    initialState: {
        themeColor: 'blue',
        layout: 0,
        showOverlay: false,
        isHeaderMenuOpen: {
            layoutMenu: false,
            themeMenu: false,
            fontsMenu: false
        },
        // show Add or Remove buttons on resume items
        showAddRemoveButtons: {
            id: null,
            show: false,
            blockName: null,
        },


    },
    reducers: {
        setThemeColor: (state, action) => {
            return {
                ...state,
                themeColor: action.payload
            }
        },

        setShowOverlay: (state, action) => {
            return {
                ...state,
                showOverlay: action.payload
            }
        },
        setLayout: (state, action) => {
            return {
                ...state,
                layout: action.payload
            }
        },
        setIsHeaderMenuOpen: (state, action) => {
            return {
                ...state,
                isHeaderMenuOpen: {
                    ...state.isHeaderMenuOpen,
                    [action.payload.menu]: action.payload.value
                }
            }
        },

        setShowAddRemoveButtons: (state, action) => {
            return {
                ...state,
                showAddRemoveButtons: {
                    id: action.payload.id,
                    show: action.payload.show
                }
            }
        },

    }
});

export const { setThemeColor, setShowOverlay, setLayout, setIsHeaderMenuOpen, setShowAddRemoveButtons, } = editorSettingsSlice.actions;
export default editorSettingsSlice.reducer;