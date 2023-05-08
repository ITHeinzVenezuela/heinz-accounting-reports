import React, {ReactNode} from 'react';

interface Props extends IconProps {
  children: ReactNode
}

const Icon = (props: Props): JSX.Element => {

  const { color, viewBox, className, ...rest } = props

  return (
    <svg
      fill={color}
      viewBox={viewBox}
      className={className}
      {...rest}
    >
      {props.children}
    </svg>
  )
}

export default Icon;