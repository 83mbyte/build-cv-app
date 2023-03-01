import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { storageAPI } from "../../../API/storageAPI";

const DATA_TEMPLATE_OBJECT = {
    ext: '',
    path: 'image',
    url: ''
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
            .addCase(uploadImage.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(uploadImage.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(uploadImage.fulfilled, (state, action) => {
                state.status = 'succeeded';
                if (action.payload && (action.payload.ext && action.payload.url)) {
                    state.data = {
                        ...state.data,
                        ext: action.payload.ext,
                        url: action.payload.url
                    }
                }
            })
            .addCase(getImage.pending, (state) => {
                state.status = 'pending';
            })
            .addCase(getImage.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(getImage.fulfilled, (state, action) => {
                state.status = 'succeeded';
                if (action.payload && (action.payload.ext && action.payload.url)) {
                    state.data = {
                        ...state.data,
                        ext: action.payload.ext,
                        url: action.payload.url
                    }
                }
            })
            .addCase(deleteImage.pending, (state) => {
                state.status = 'pending';
            })
            .addCase(deleteImage.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(deleteImage.fulfilled, (state, action) => {
                state.status = 'succeeded';
                if (action.payload === 'success') {
                    state.data = { ...DATA_TEMPLATE_OBJECT }
                }
            })
    }
})

export const { imageUpload, imageDelete } = imageSlice.actions;
export default imageSlice.reducer;


//extraReducers funcs
export const uploadImage = createAsyncThunk('image/uploadImageFile', async (data) => {
    console.log('start file uploading..');
    const resp = await storageAPI.uploadImageFile(data.user.userId, data.file, data.fileExt);
    if (resp) {
        console.log('file upload complete.')
        return resp
    }
})

export const getImage = createAsyncThunk('image/getImageFile', async (user) => {
    const resp = await storageAPI.getImageFile(user);
    if (resp) {
        console.log('got file from storage');
        return resp
    }
})

export const deleteImage = createAsyncThunk('image/deleteImageFile', async ({ user, ext }) => {
    console.log('delete image');
    const resp = await storageAPI.deleteImageFile(user, ext);
    if (resp) {
        return resp
    }
})