import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchAPI } from "../../../API/api";


const DATA_TEMPLATE_OBJECT = {
    label: {
        label: 'Label',
        path: 'websoclinks/label',
        type: 'text',
        value: ''
    },
    link: {
        label: 'Link',
        path: 'websoclinks/link',
        type: 'text',
        value: ''
    },

}

export const websoclinksSlice = createSlice({
    name: 'websoclinks',
    initialState: {
        data: [
            DATA_TEMPLATE_OBJECT
        ],
        status: 'idle',
        error: ''
    },
    reducers: {
        loadStateFrom: (state, action) => {
            if (action.payload) {
                state.data = action.payload
            }
        },
        addNewWebSocLinksItem: (state) => {
            //state.data.push(DATA_TEMPLATE_OBJECT);
            state.data = [...state.data, DATA_TEMPLATE_OBJECT]
        },
        removeWebSocLinksItem: (state, action) => {
            state.data.splice(action.payload, 1);
            if (state.data.length < 1) {
                state.data = [DATA_TEMPLATE_OBJECT]
            }
        },
        websoclinksStateValueUpdate: (state, action) => {
            state.data[action.payload.path[0]][action.payload.path[1]].value = action.payload.value;

        },
    },
    extraReducers(builder) {
        builder
            .addCase(fetchWebSocLinks.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(fetchWebSocLinks.fulfilled, (state, action) => {
                state.status = 'succeeded';
                if (action.payload) {
                    state.data = action.payload
                } else {
                    state.data = [DATA_TEMPLATE_OBJECT]
                }
            })
            .addCase(fetchWebSocLinks.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
    }
})


export const { loadStateFrom, addNewWebSocLinksItem, removeWebSocLinksItem, websoclinksStateValueUpdate } = websoclinksSlice.actions;
export default websoclinksSlice.reducer;

export const fetchWebSocLinks = createAsyncThunk('websoclinks/fetchWebSocLinks', async (userName) => {
    const response = await fetchAPI.fethingSubPath('websoclinks', userName)
    if (response && response !== 'Error -- fethingSubPath from api.js') {
        return response
    }
})
