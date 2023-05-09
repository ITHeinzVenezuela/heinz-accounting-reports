import React, { ChangeEventHandler } from 'react'

type Props = {
  id: string,
  type: string,
  title: string,
  required?: boolean,
  className?: string,
  titleStyle?: string,
  autoComplete?: string,
  disabled: boolean,
  onChange?: ChangeEventHandler<HTMLInputElement>
}

const Input = (props: Props) => {
  const { title = "", titleStyle = "", className = "Input", id, required = true, ...rest } = props

  return (
    <label
      htmlFor={id}
      className={className}
    >
      <span className={titleStyle}>
        {title}
      </span>
      <input
        id={id}
        name={id}
        required={required}
        {...rest}
      />
    </label>
  )
}

export default Input;