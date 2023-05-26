import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    location: 'Sushi'
}

export const locationSlice = createSlice({
    name: 'location',
    initialState, 
    reducers: {
        changeLocation: (state, action) => {
            state.location = action.payload
        }
    }
})

export const {changeLocation} = locationSlice.actions

export default locationSlice.reducer