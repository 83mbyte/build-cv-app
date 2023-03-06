
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchAPI } from "../../../API/api";

const DATA_TEMPLATE_OBJECT = {
    ext: '',
    path: 'image',
    url: '',
    encoded: ''
}
export const imageSlice = createSlice({
    name: 'image',
    initialState: {
        data: { ...DATA_TEMPLATE_OBJECT },
        status: 'idle',
        error: '',
    },
    reducers: {
        imageUpload: (state, action) => {
            state.data.url = action.payload.url;
            state.data.ext = action.payload.ext;
        },
        imageDelete: (state) => {
            state.data.url = '';
            state.data.ext = '';
        }
    },
    extraReducers(builder) {
        builder
            .addCase(uploadImageData.pending, (state) => {
                state.status = 'pending';
            })
            .addCase(uploadImageData.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(uploadImageData.fulfilled, (state, action) => {
                state.status = 'succeeded';
                if (action.payload && action.payload !== '') {
                    state.data = {
                        ...state.data,
                        encoded: action.payload
                    }
                }
            })
            .addCase(getImageData.pending, (state) => {
                state.status = 'pending';
            })
            .addCase(getImageData.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(getImageData.fulfilled, (state, action) => {
                state.status = 'succeeded';
                if (action.payload && action.payload !== '') {
                    state.data = {
                        ...state.data,
                        encoded: action.payload
                    }
                }
            })
            .addCase(deleteImageData.pending, (state) => {
                state.status = 'pending';
            })
            .addCase(deleteImageData.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(deleteImageData.fulfilled, (state, action) => {
                state.status = 'succeeded';
                if (action.payload === 'image removed') {
                    state.data = {
                        ...state.data,
                        encoded: ''
                    }
                }
            })
    }
})

export const { imageUpload, imageDelete } = imageSlice.actions;
export default imageSlice.reducer;


//extraReducers funcs

export const getImageData = createAsyncThunk('image/getImageData', async (user) => {
    const resp = await fetchAPI.fethingSubPath('image/value', user);
    if (resp) {
        return resp
    }
})

export const uploadImageData = createAsyncThunk('image/uploadImageData', async ({ imageData, user }) => {
    const resp = await fetchAPI.putUserImageData(imageData, user);
    if (resp && resp.status === 200) {
        return imageData
    }
})

export const deleteImageData = createAsyncThunk('image/deleteImageData', async (user) => {
    const resp = await fetchAPI.putUserImageData('', user);
    if (resp && resp.status == 200) {
        return 'image removed'
    }
})