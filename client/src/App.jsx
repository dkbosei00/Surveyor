import { useState } from 'react'
import './App.css'
import Home from './pages/home'
import {QueryClient, QueryClientProvider} from "@tanstack/react-query"
import { Provider } from 'react-redux'
import {store} from './redux/store'

function App() {
  // const queryClient = new QueryClient()

  return (
    <>
    <Provider store={store}>
      {/* <QueryClientProvider client={queryClient}> */}
        <Home/>
      {/* </QueryClientProvider> */}
    </Provider>
    </>
  )
}

export default App
