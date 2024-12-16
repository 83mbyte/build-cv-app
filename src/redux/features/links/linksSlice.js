import { dbAPI } from "@/lib/dbAPI";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const DATA_TEMPLATE_OBJECT = {
    label: '',
    link: ''
}

const linksSlice = createSlice({
    name: 'links',
    initialState: {
        data: [],
        __serv: { isSectionVisible: true },
        status: 'idle',
        error: ''
    },
    reducers: {
        inputLinksUpdate: (state, action) => {
            state.data[action.payload.arrayIndex][action.payload.inputName] = action.payload.value;
        },
        removeLinksItem: (state, action) => {
            state.data.splice(action.payload, 1);
            if (state.data.length < 1) {
                state.data = []
            }
        },
        addLinksItem: (state, action) => {
            if (!action.payload) {
                state.data = [...state.data, DATA_TEMPLATE_OBJECT]
            } else {
                state.data = [...state.data, { label: action.payload.label, link: action.payload.link }]
            }
        }
    },

    extraReducers(builder) {
        builder
            .addCase(getLinks.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(getLinks.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(getLinks.fulfilled, (state, action) => {
                if (action.payload) {
                    state.status = 'ready';

                    if (action.payload.data) {
                        state.data = action.payload.data;
                    }
                    if (action.payload.__serv) {
                        state.__serv = { ...action.payload.__serv };
                    }
                }
            })
    }
})

export default linksSlice.reducer;
export const { inputLinksUpdate, removeLinksItem, addLinksItem } = linksSlice.actions;


export const getLinks = createAsyncThunk('links/getLinks', async (obj) => {
    let resp = await dbAPI.getSectionData('links', obj.userId, obj.accessToken);
    if (resp) {
        return resp;
    } else {
        return null
    }
})
