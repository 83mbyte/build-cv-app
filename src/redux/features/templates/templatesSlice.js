import { createSlice } from "@reduxjs/toolkit";

const templatesSlice = createSlice({
    name: 'templates',
    initialState: {
        data: {
            selected: null,
            variants: [{
                label: 'Amsterdam',
                img: 'https://s3.resume.io/cdn-cgi/image/format=auto,fit=scale-down,dpr=1,width=154/uploads/local_template_image/image/503/persistent-resource/amsterdam-resume-templates.jpg'
            },
            {
                label: 'Dublin',
                img: 'https://s3.resume.io/cdn-cgi/image/format=auto,fit=scale-down,dpr=1,width=154/uploads/local_template_image/image/488/persistent-resource/dublin-resume-templates.jpg'
            },
            {
                label: 'Vivien',
                img: 'https://s3.resume.io/cdn-cgi/image/format=auto,fit=scale-down,dpr=1,width=154/uploads/local_template_image/image/406/persistent-resource/vienna-resume-templates.jpg'
            },
            {
                label: 'Lndn',
                img: 'https://s3.resume.io/cdn-cgi/image/format=auto,fit=scale-down,dpr=1,width=154/uploads/local_template_image/image/481/persistent-resource/london-resume-templates.jpg'
            },
            ]
        },

    },
    reducers: {
        setSelectedTemplate: (state, action) => {
            state.data.selected = action.payload;
        }
    }
})


export default templatesSlice.reducer;
export const { setSelectedTemplate } = templatesSlice.actions;
