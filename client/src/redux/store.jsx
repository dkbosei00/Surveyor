import {configureStore} from '@reduxjs/toolkit'
import locationReducer from './features/locationSlice'
import chainReducer from './features/chainSlice'

export const store = configureStore({
    reducer: {
        chain: chainReducer,
        location: locationReducer
    }
})