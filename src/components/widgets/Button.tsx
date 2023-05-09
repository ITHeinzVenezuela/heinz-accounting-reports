import React, { ReactNode } from 'react'
import Spinner from './Spinner'

type Props = {
  color?: string,
  loading?: boolean,
  type?: "button" | "submit" | "reset" | undefined,
  noSpinner?: boolean,
  children: ReactNode,
}

const Button = (props: Props) => {

  const { color, loading = false, type = "button", noSpinner = false, children, ...rest } = props

  const spinner = noSpinner ? children : <Spinner text size="small" />

  return (
    <button
      type={type}
      disabled={loading}
      className={`Button ${!loading ? color : ""}`}
      {...rest}
    >
      {
        !loading ? children : spinner
      }
    </button>
  )
}
export default Button;