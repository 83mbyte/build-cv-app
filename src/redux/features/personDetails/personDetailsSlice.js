import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchAPI } from "../../../API/api";

export const personDetailsSlice = createSlice({
    name: 'personDetails',
    initialState: {
        data: {
            position: {
                jobTitle: {
                    label: "Wanted Job Title",
                    path: "personDetails/position/jobTitle",
                    type: "text",
                    value: "dev slice"
                }
            },
            name: {
                firstName: {
                    label: "First Name",
                    path: "personDetails/name/firstName",
                    required: true,
                    type: "text",
                    value: ""
                },
                lastName: {
                    label: "Last Name",
                    path: "personDetails/name/lastName",
                    required: true,
                    type: "text",
                    value: "slice"
                }
            },
            address: {
                city: {
                    label: "City",
                    path: "personDetails/address/city",
                    type: "text",
                    value: ""
                },
                country: {
                    label: "Country",
                    path: "personDetails/address/country",
                    type: "text",
                    value: ""
                },
                street: {
                    label: "Street",
                    path: "personDetails/address/street",
                    type: "text",
                    value: ""
                }
            },
            contacts: {
                email: {
                    label: "Email",
                    path: "personDetails/contacts/email",
                    required: true,
                    type: "text",
                    value: ""
                },
                phone: {
                    label: "Phone",
                    path: "personDetails/contacts/phone",
                    required: false,
                    type: "text",
                    value: ""
                },

            },
        },
        inputsOrder: ['position', 'name', 'address', 'contacts'],
        status: 'idle',
        error: null,
        isSectionVisible: true,

    },
    reducers: {
        loadStateFrom: (state, action) => {
            state.data = action.payload
        },
        setJobTitle: state => {
            state.data.position.jobTitle.value = 'Test Set JobTitle'
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

                if (action.payload && action.payload.data) {
                    state.data = action.payload.data;
                    state.isSectionVisible = action.payload.__serv.isSectionVisible;
                } else {
                    state.isSectionVisible = true;
                }
            })
            .addCase(fetchPersonDetails.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
    }
})

export const { setJobTitle, loadStateFrom, inputUpdate } = personDetailsSlice.actions;

export default personDetailsSlice.reducer;

export const fetchPersonDetails = createAsyncThunk('personDetails/fetchPersonDetails', async (user) => {
    const data = await fetchAPI.fethingSubPath('personDetails', user);
    if (data && data !== 'Error -- fethingSubPath from api.js') {
        return data
    }
})


