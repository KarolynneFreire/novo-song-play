import { string, bool, func, object, number } from 'prop-types'
import classes from './styles/styles.module.css'

export function Input(props) {

  return (
    <>
      <label 
        htmlFor={ props.htmlFor }
      >
        { props.label }
      </label>
      { props.isInputPassword ? (
        <div className={classes.container_password}>
          <>
            <input 
              type={ props.typeInput }
              value={ props.value }
              onChange={ props.onChange }
              placeholder={ props.placeholder }
              className={ classes.input_password } 
              name={ props.name }
            />
            
            <button 
              type={ props.typeBtn } 
              className={ classes.button_eyes } 
              onClick={ props.onClick }
            >
              { props.isHiddenPassword }
            </button>
          </>
        </div>
      ) : (
        <input 
          type={ props.type } 
          placeholder={ props.placeholder }
          className={ classes.input_login } 
          value={ props.value } 
          onChange={ props.onChange }
          maxLength={ props.maxLength }
          name={ props.name }
        />
      ) }
    </>
  )
}

Input.propTypes = {
  isInputPassword: bool,
  typeInput: string,
  typeBtn: string,
  onChange: func,
  className: string,
  onClick: func,
  id: string,
  placeholder: string,
  isHiddenPassword:  object,
  classNameInput: string,
  maxLength: number,
  onKeyDown: func,
  name: string,
  htmlFor: string,
  label: string
}