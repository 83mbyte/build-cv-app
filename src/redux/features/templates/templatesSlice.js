import { createSlice } from "@reduxjs/toolkit";

import { templatesData } from "@/lib/content-lib";

const templatesSlice = createSlice({
    name: 'templates',
    initialState: {
        data: {
            selected: null,
            variants: [
                ...templatesData.templates.map(elem => elem)

                //  -- follow elem structure as --  
                // { 
                //     label: 'templateName', 
                //     img: 'path_to_template_thumbnail'
                // }

            ],
            isTemplateLoaded: false
        },
    },
    reducers: {
        setSelectedTemplate: (state, action) => {

            state.data.selected = action.payload;
        },
        setIsTemplateLoaded: (state, action) => {
            state.data.isTemplateLoaded = action.payload;
        }
    }
})

export default templatesSlice.reducer;
export const { setIsTemplateLoaded, setSelectedTemplate } = templatesSlice.actions;