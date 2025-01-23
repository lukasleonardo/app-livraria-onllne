'use client'
import { QueryClientProvider } from "@tanstack/react-query"
import { Provider as ReduxProvider } from 'react-redux'
import { store } from '../lib/store'
import { queryClient } from '@/lib/queryClient'
import { SessionProvider } from "next-auth/react"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient} >
        <ReduxProvider store={store}>{children}</ReduxProvider>
      </QueryClientProvider>
    </SessionProvider>   
  )
  
  
}

