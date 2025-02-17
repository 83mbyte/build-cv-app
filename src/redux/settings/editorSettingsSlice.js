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
        // show or hide the resume block
        showBlockControl: {
            show: false,
            blockName: null
        },
        showModal: {
            show: false,
            blockName: null,
            id: null,
        }

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
        setShowBlockControl: (state, action) => {
            return {
                ...state,
                showBlockControl: {
                    show: action.payload.show,
                    blockName: action.payload.blockName
                }
            }
        },
        setLayout: (state, action) => {
            return {
                ...state,
                layout: action.payload
            }
        },

        setShowModal: (state, action) => {
            if (action.payload && action.payload.blockName && action.payload.show) {
                return {
                    ...state,
                    showModal: {
                        show: action.payload.show,
                        blockName: action.payload.blockName,
                        id: action.payload.id ?? null
                    }
                }
            } else {
                return {
                    ...state,
                    showModal: {
                        show: false,
                        blockName: null,
                        id: null
                    }
                }
            }
        },


    }
});

export const { setThemeColor, setShowOverlay, setLayout, setIsHeaderMenuOpen, setShowAddRemoveButtons, setShowBlockControl, setShowModal, } = editorSettingsSlice.actions;
export default editorSettingsSlice.reducer;