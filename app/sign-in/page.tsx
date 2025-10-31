import React from 'react'
import LoginForm from './components/LoginForm'
import { Toaster } from 'sonner'

const SignIn = () => {
  return (
    <div className='w-full h-screen flex justify-center items-center'>
      <Toaster/>
      <LoginForm/>
    </div>
  )
}

export default SignIn