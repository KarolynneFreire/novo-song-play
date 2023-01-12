import { string, func, array, bool } from 'prop-types'
import classes from './styles/select.module.css'

export function Select(props) {

  return (
    <div className={classes.category_container}>
      <label 
        htmlFor={ props.htmlFor } 
        className={classes.category_label}
      >
        {props.label}
      </label>
      <select 
        value={ props.value }
        name={ props.name }
        className={ classes.select }
        onChange={event => props.onChange(event.target.value)}
      >
        <option value="">{ props.optionTextWithoutValue }</option>
        { props.array.map((element, index) => {
          return (
            <option 
              value={element}
              key={index}
            >
              {element === props.upperCase[index] && props.pascalCase[index]}
            </option>
          )
        }) }

      </select>
    </div>
  )
}

Select.propTypes = {
  htmlFor: string,
  label: string,
  value: string,
  name: string,
  array: array,
  optionTextWithoutValue: string,
  upperCase: array,
  pascalCase: array,
  onChange: func,
  isCategory: bool
}