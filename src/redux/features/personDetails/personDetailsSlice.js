import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchAPI } from "../../../API/api";

export const personDetailsSlice = createSlice({
    name: 'personDetails',
    initialState: {
        data: {
            positions: {
                jobTitle: {
                    label: "Wanted Job Title",
                    path: "",
                    type: "text",
                    value: ""
                }
            },
            name: {
                firstName: {
                    label: "First Name",
                    path: "",
                    required: "true",
                    type: "text",
                    value: "first name"
                },
                lastName: {
                    label: "Last Name",
                    path: "",
                    required: "true",
                    type: "text",
                    value: "last name"
                }
            },
            address: {
                city: {
                    label: "City",
                    path: "",
                    type: "text",
                    value: "your address"
                },
                country: {
                    label: "Country",
                    path: "",
                    type: "text",
                    value: "your country"
                },
                street: {
                    label: "Street",
                    path: "",
                    type: "text",
                    value: "your street"
                }
            },
            contacts: {
                email: {
                    label: "Email",
                    path: "",
                    required: "true",
                    type: "text",
                    value: "example@example.com"
                },
                phone: {
                    label: "Phone",
                    path: "",
                    required: "false",
                    type: "text",
                    value: "+35989878597"
                },

            },
        },
        status: 'idle',
        error: null

    },
    reducers: {
        loadStateFrom: (state, action) => {
            state.data = action.payload
        },
        setJobTitle: state => {
            state.data.positions.jobTitle.value = 'Test Set JobTitle'
        },
        inputUpdate: (state, action) => {
            state.data[action.payload.path[0]][action.payload.path[1]].value = action.payload.value;
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchPersonDetails.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchPersonDetails.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchPersonDetails.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
    }
})

export const { setJobTitle, loadStateFrom, inputUpdate } = personDetailsSlice.actions;

export default personDetailsSlice.reducer;

export const fetchPersonDetails = createAsyncThunk('personDetails/fetchPersonDetails', async (userName) => {
    const data = await fetchAPI.fethingSubPath('personDetails', userName)
    if (data && data !== 'Error -- fethingSubPath from api.js') {
        return data
    }
})


