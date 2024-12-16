import { dbAPI } from "@/lib/dbAPI";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

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

export const uploadImageData = createAsyncThunk('userImage/uploadImageData', async ({ userLogged, imageData }) => {
    const resp = await dbAPI.putUserImageData(userLogged.userId, userLogged.accessToken, imageData);
    if (resp) {
        console.log('RESP image :', resp)
    }
    if (resp && resp.status === 200) {
        return imageData
    }
})

export const deleteImageData = createAsyncThunk('userImage/deleteImageData', async ({ userLogged }) => {
    const resp = await dbAPI.putUserImageData(userLogged.userId, userLogged.accessToken, '')
    if (resp && resp.status === 200) {
        return 'image removed'
    }
})

export const getUserImage = createAsyncThunk('userImage/getUserImage', async (obj) => {

    let resp = await dbAPI.getSectionData('image', obj.userId, obj.accessToken);
    if (resp) {
        return resp;
    } else {
        return null
    }
})