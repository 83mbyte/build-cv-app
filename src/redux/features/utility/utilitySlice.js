import { createSlice } from "@reduxjs/toolkit";


const utilitySlice = createSlice({
    name: 'utility',
    initialState: {
        menuDrawer: {
            isOpen: false
        },
        previewDrawer: {
            isOpen: false,
        },

    },
    reducers: {
        menuDrawerIsOpenToggle: (state) => {
            state.menuDrawer.isOpen = !state.menuDrawer.isOpen;
        },
        previewDrawerIsOpenToggle: (state) => {
            state.previewDrawer.isOpen = !state.previewDrawer.isOpen

        },
    }

})


export default utilitySlice.reducer;
export const { menuDrawerIsOpenToggle, previewDrawerIsOpenToggle } = utilitySlice.actions;