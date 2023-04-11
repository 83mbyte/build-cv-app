import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { dbAPI } from "../../../api/api";

const userImageSlice = createSlice({
    name: 'userImage',
    initialState: {
        status: 'idle',
        error: '',
        data: { value: '' }
    },
    extraReducers(builder) {
        builder
            .addCase(uploadImageData.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(uploadImageData.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(uploadImageData.fulfilled, (state, action) => {
                state.status = 'ready';
                if (action.payload && action.payload !== '') {
                    state.data = {
                        value: action.payload
                    }
                }
            })
            .addCase(getUserImage.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getUserImage.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(getUserImage.fulfilled, (state, action) => {
                state.status = 'ready';
                if (action.payload && action.payload !== '') {
                    state.data = {
                        value: action.payload.value
                    }
                }
            })
            .addCase(deleteImageData.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(deleteImageData.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(deleteImageData.fulfilled, (state, action) => {
                state.status = 'ready';
                if (action.payload && action.payload === 'image removed') {
                    state.data = {
                        value: ''
                    }
                }
            })
    }
})

export default userImageSlice.reducer;

export const uploadImageData = createAsyncThunk('userImage/uploadImageData', async ({ user, imageData }) => {
    const resp = await dbAPI.putUserImageData(user.userId, imageData)
    if (resp && resp.status === 200) {
        return imageData
    }
})

export const deleteImageData = createAsyncThunk('userImage/deleteImageData', async ({ user }) => {
    const resp = await dbAPI.putUserImageData(user.userId, '')
    if (resp && resp.status === 200) {
        return 'image removed'
    }
})

export const getUserImage = createAsyncThunk('userImage/getUserImage', async (obj) => {
    let resp = await dbAPI.getSectionData('image', obj.userId);
    if (resp) {
        return resp;
    } else {
        return null
    }
})