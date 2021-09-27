import React from 'react'
import ReactDOM from 'react-dom'
import AppRouter from './appRouter/AppRouter'
import { BrowserRouter } from 'react-router-dom'
import { QueryClientProvider, QueryClient } from 'react-query'
import { SnackbarProvider } from 'notistack'
import { PostsContextProvider } from './context/PostsContext'

import { ThemeProvider } from '@material-ui/core'
import theme from './assets/styles/mui_palette'
import './assets/styles/index.scss'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
})

ReactDOM.render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <PostsContextProvider>
          <SnackbarProvider maxSnack={3}>
            <AppRouter />
          </SnackbarProvider>
        </PostsContextProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </BrowserRouter>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
