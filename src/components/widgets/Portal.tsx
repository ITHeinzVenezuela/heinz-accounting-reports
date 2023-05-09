import React, { useState, useEffect, ReactNode } from 'react'
import { createPortal } from 'react-dom';


type Props = {
  type: "modal" | "alert",
  children: ReactNode,
}

const Portal = ({ type = "modal", children }: Props) => {
  // type = "modal" | "alert"
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    mounted ? createPortal(children, (document.getElementById(type) as Element | DocumentFragment)) : <></>
  )
}

export default Portal;