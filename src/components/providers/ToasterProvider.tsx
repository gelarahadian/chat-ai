import React from 'react'
import { Toaster } from 'sonner'

const ToasterProvider = ({children}: Readonly<{children: React.ReactNode}>) => {
  return (
    <>
    <Toaster/>
    {children}
    </>
  )
}

export default ToasterProvider