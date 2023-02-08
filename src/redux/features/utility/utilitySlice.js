import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchAPI, authAPI } from "../../../API/api";



const utilitySlice = createSlice({
    name: 'utility',
    initialState: {

        isModifiedContent: {
            status: false,
            sections: []
        },

        auth: {
            data: null,
            status: '',
            error: ''
        }
    },
    reducers: {

        setIsModifiedTrue: (state, action) => {
            if (!state.isModifiedContent.sections.includes(action.payload.section)) {
                state.isModifiedContent.status = true;
                state.isModifiedContent.sections = [...state.isModifiedContent.sections, action.payload.section];
            }
        },
        setIsModifiedFalse: (state) => {
            state.isModifiedContent.status = false;
            state.isModifiedContent.sections = [];
        },
        clearAuthError: (state) => {
            state.auth.error = ''
        }

    },
    extraReducers(builder) {
        builder
            .addCase(putDataOnServer.fulfilled, (state, action) => {
                let index = state.isModifiedContent.sections.indexOf(action.payload);
                if (index !== -1) {
                    state.isModifiedContent.sections.splice(index, 1);
                    if (state.isModifiedContent.sections.length == 0) {
                        state.isModifiedContent.status = false;
                    }
                }
            })
            .addCase(authLogin.pending, (state) => {
                state.auth.status = 'loading'
            })
            .addCase(authLogin.fulfilled, (state, action) => {
                state.auth.status = 'succeeded';
                if (action.payload && action.payload.userId && action.payload.accessToken) {
                    state.auth.data = action.payload;
                } else {

                    state.auth.data = null;
                    state.auth.error = 'wrong login/password'
                }
            })
            .addCase(authLogin.rejected, (state, action) => {
                state.auth.status = 'failed'
                state.auth.error = action.error.message
            })
    }

})

export const { setIsModifiedTrue, setIsModifiedFalse, clearAuthError } = utilitySlice.actions;
export default utilitySlice.reducer;

export const putDataOnServer = createAsyncThunk('utility/putDataOnServer', async (data) => {
    const response = await fetchAPI.putDataToWholeSection(data.user, data.path, data.value);
    if (response.ok && response.status === 200) {
        return data.path
    }
})

export const authLogin = createAsyncThunk('utility/authLogin', async (dataObj) => {

    let loggedUser = await authAPI.login(dataObj.auth, dataObj.email, dataObj.password);
    if (loggedUser && loggedUser.userId) {
        return loggedUser
    } else {
        return null
    }
});