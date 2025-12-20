'use client'

import { ReactNode, useEffect } from 'react'
import { eventBus } from '../../lib/eventBus'
import { useRouter } from 'next/navigation'

const EventBusProvider = ({children}: {children: ReactNode}) => {
    const router = useRouter()
    useEffect(() => {
        eventBus.on("token-expired", () => {
            router.push("/auth/sign-in");
        })
    },[])
  return (
    <>
        {children}
    </>
  )
}

export default EventBusProvider