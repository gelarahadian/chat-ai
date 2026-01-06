import { ChatProvider } from '@/src/contexts/chat-context'
import React from 'react'

const ContextProvider = ({children}: {children: React.ReactNode}) => {
  return (
    <ChatProvider>{children}</ChatProvider>
  )
}

export default ContextProvider