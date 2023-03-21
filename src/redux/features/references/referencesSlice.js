import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchAPI } from "../../../API/api";

const DATA_TEMPLATE_OBJECT = {
    referentName: {
        label: `Referent's full name`,
        path: 'references/referentName',
        type: 'text',
        value: '',
    },
    company: {
        label: `Company`,
        path: 'references/company',
        type: 'text',
        value: '',
    },
    phone: {
        label: `Phone`,
        path: 'references/phone',
        type: 'text',
        value: '',
    },
    email: {
        label: `Email`,
        path: 'references/email',
        type: 'text',
        value: '',
    }
}

export const referencesSlice = createSlice({
    name: 'references',
    initialState: {
        data: [],
        status: 'idle',
        error: '',
        isSwitchChecked: false,
        isSectionVisible: false,
    },
    reducers: {
        referenceSwitchToggle: (state) => {
            state.isSwitchChecked = !state.isSwitchChecked;
        },
        addNewReferencesItem: (state) => {
            state.data = [DATA_TEMPLATE_OBJECT]
        },
        removeReferencesItem: (state, action) => {
            state.data.splice(action.payload, 1);
            if (state.data.length < 1) {
                state.data = []
            }
        },
        referencesStateValueUpdate: (state, action) => {
            state.data[action.payload.path[0]][action.payload.path[1]].value = action.payload.value;
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchReferences.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchReferences.fulfilled, (state, action) => {
                state.status = 'succeeded';
                if (action.payload) {
                    if (action.payload.data) {
                        state.data = action.payload.data;
                    }
                    if (action.payload.__serv) {
                        state.isSwitchChecked = action.payload.__serv.isSwitchChecked;
                        state.isSectionVisible = action.payload.__serv.isSectionVisible;
                    }
                } else {
                    state.data = [];
                    state.isSwitchChecked = false;
                    state.isSectionVisible = true;
                }
            })
            .addCase(fetchReferences.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
    }
})

export default referencesSlice.reducer;
export const { referenceSwitchToggle, addNewReferencesItem, removeReferencesItem, referencesStateValueUpdate } = referencesSlice.actions;

export const fetchReferences = createAsyncThunk('references/fetchReferences', async (user) => {
    const response = await fetchAPI.fethingSubPath('references', user);
    if (response && response !== 'Error -- fethingSubPath from api.js') {
        return response;
    }
})

