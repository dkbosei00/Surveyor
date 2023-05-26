import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    chain: 'ETH',
    chains: []
}

export const chainSlice = createSlice({
    name: 'chain',
    initialState,
    reducers: {
        changeChain: (state, action) => {
            state.chain = action.payload
        },
        setChains: (state, action) => {
            state.chains = action.payload
        },
    }
})

export const {changeChain, setChains} = chainSlice.actions

export default chainSlice.reducer