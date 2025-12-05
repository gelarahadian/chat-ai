'use client'

import { useMe } from "@/src/hooks/use-auth"
import { useEffect } from "react";

const page = () => {
  const userMutation = useMe();

  useEffect(() => {
    userMutation.mutate()
  },[])
  return (
    <div>page</div>
  )
}
    
export default page