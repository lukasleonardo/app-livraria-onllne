'use client'
import React from 'react'
import { QueryClientProvider } from "@tanstack/react-query"
import { Provider as ReduxProvider } from 'react-redux'
import { store } from '../lib/store'

import { SessionProvider } from "next-auth/react"
import { ThemeProvider } from "@/lib/ThemeContext"
import { queryClient } from "../lib/bookCache"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient} >
        <ReduxProvider store={store}>
          <ThemeProvider>
          {children}
          </ThemeProvider>   
          </ReduxProvider>
      </QueryClientProvider>
    </SessionProvider>   
  )
  
  
}

