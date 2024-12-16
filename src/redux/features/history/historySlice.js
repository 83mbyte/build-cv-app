import { dbAPI } from "@/lib/dbAPI";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const DATA_TEMPLATE_OBJECT = {
    job: '',
    employer: '',
    period: '',
    location: '',
    comments: ''
}

const historySlice = createSlice({
    name: 'history',
    initialState: {
        data: [],
        __serv: { isSectionVisible: true },
        status: 'idle',
        error: ''
    },
    reducers: {
        addHistoryItem: (state) => {
            state.data = [...state.data, DATA_TEMPLATE_OBJECT]
        },
        removeHistoryItem: (state, action) => {
            state.data.splice(action.payload, 1);
            if (state.data.length < 1) {
                state.data = []
            }
        },
        inputHistoryUpdate: (state, action) => {
            state.data[action.payload.arrayIndex][action.payload.inputName] = action.payload.value;
        },
    },
    extraReducers(builder) {
        builder
            .addCase(getHistory.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(getHistory.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(getHistory.fulfilled, (state, action) => {
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


export default historySlice.reducer;
export const { addHistoryItem, removeHistoryItem, inputHistoryUpdate } = historySlice.actions;

// Thunks
export const getHistory = createAsyncThunk('history/getHistory', async (obj) => {
    let resp = await dbAPI.getSectionData('history', obj.userId, obj.accessToken);
    if (resp) {
        return resp;
    } else {
        return null
    }
})