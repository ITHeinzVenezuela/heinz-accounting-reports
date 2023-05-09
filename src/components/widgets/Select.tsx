import React, { ChangeEventHandler } from 'react';

type Props = {
  title: string,
  titleStyle?: string,
  className: string,
  options: SelectOptionsValue[],
  name: string,
  defaultOption: string,
  required?: boolean,
  onChange: ChangeEventHandler<HTMLSelectElement>
}


const Select = (props: Props) => {

  const { title = "", titleStyle = "", className = "Select", options, name = "", defaultOption = "", required = true, ...rest } = props

  const selectsOptions = [...options]

  // Añade un elemento por defecto al inicio del select
  selectsOptions.unshift({ name: defaultOption, value: "" })

  return (
    <label htmlFor={name} className={className}>
      <span className={titleStyle}>
        {title}
      </span>
      <select name={name} id={name} required={required} {...rest}>
        {
          selectsOptions.map(({ name, value }, i) =>
            <option value={value} key={`name-${i}`}>
              {name}
            </option>
          )
        }
      </select>
    </label>
  );
};

export default Select;
