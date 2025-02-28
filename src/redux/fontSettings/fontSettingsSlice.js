import { createSlice } from "@reduxjs/toolkit";


const fontSizesArray = {
    // arrays of fonts size of Small,Medium,Large fonts
    //  like h1: [ [array#1], 'xl' ],
    // data in [ array#1] - for editable inputs
    // data in ('xl') string - for not editable inputs, to render pdfs

    Small: {
        size: 'Small',
        h1: [['lg', '2xl', '4xl'], '2.25rem'],
        h2: [['xs', 'sm', 'sm'], '0.875rem'],
        h3: [['xs', 'sm', 'sm'], '0.875rem'],
        h4: [['xs', 'sm', 'sm'], '0.875rem'],
        p: [['xs', 'sm', 'sm'], '0.875rem'],
    },
    Medium: {
        size: 'Medium',
        h1: [['xl', '3xl', '5xl'], '3rem'],
        h2: [['sm', 'md', 'md'], '1rem'],
        h3: [['sm', 'md', 'md'], '1rem'],
        h4: [['sm', 'md', 'md'], '1rem'],
        p: [['sm', 'md', 'md'], '1rem'],
    },
    Large: {
        size: 'Large',
        h1: [['2xl', '4xl', '6xl'], '3.75rem'],
        h2: [['md', 'lg', 'lg'], '1.125rem'],
        h3: [['md', 'lg', 'lg'], '1.125rem'],
        h4: [['md', 'lg', 'lg'], '1.125rem'],
        p: [['md', 'lg', 'lg'], '1.125rem']
    }
}
// const fontSizesArray = {
//     // arrays of fonts size of Small,Medium,Large fonts
//     //  like h1: [ [array#1], 'xl' ],
//     // data in [ array#1] - for editable inputs
//     // data in ('xl') string - for not editable inputs, to render pdfs

//     Small: {
//         size: 'Small',
//         h1: [['lg', '2xl', '4xl'], '4xl', '3rem'],
//         h2: [['xs', 'sm', 'sm'], 'sm'],
//         h3: [['xs', 'sm', 'sm'], 'sm'],
//         h4: [['xs', 'sm', 'sm'], 'sm'],
//         p: [['xs', 'sm', 'sm'], 'sm'],
//     },
//     Medium: {
//         size: 'Medium',
//         h1: [['xl', '3xl', '5xl'], '5xl', '5rem'],
//         h2: [['sm', 'md', 'md'], 'md'],
//         h3: [['sm', 'md', 'md'], 'md'],
//         h4: [['sm', 'md', 'md'], 'md'],
//         p: [['sm', 'md', 'md'], 'md'],
//     },
//     Large: {
//         size: 'Large',
//         h1: [['2xl', '4xl', '6xl'], '6xl'],
//         h2: [['md', 'lg', 'lg'], 'lg'],  // check  md size..  maybe it must be sm
//         h3: [['md', 'lg', 'lg'], 'lg'],
//         h4: [['md', 'lg', 'lg'], 'lg'],
//         p: [['md', 'lg', 'lg'], 'lg']
//     }
// }

export const fontSettingsSlice = createSlice({
    name: 'fontSettings',
    initialState: {
        currentFont: null,
        fontSize: fontSizesArray['Medium']

    },
    reducers: {
        setCurrentFont: (state, action) => {
            if (action.payload == 'default') {
                return {
                    ...state,
                    currentFont: null
                }
            }
            return {
                ...state,
                currentFont: action.payload
            }
        },
        setFontSize: (state, action) => {
            return {
                ...state,
                fontSize: {
                    ...fontSizesArray[action.payload],
                    size: action.payload
                }
            }
        },
    }
})

export const { setFontSize, setCurrentFont } = fontSettingsSlice.actions;
export default fontSettingsSlice.reducer;