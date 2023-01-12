import { bool, func, number, string } from 'prop-types'
import { Link } from 'react-router-dom'
// import classes from './styles/button.module.css'

export function Button(props) {
  return (
    <>
      { props.isLoginScreen ? (
        <>
          <div className={ props.classNameSeparator }>
            { props.separatorText }
          </div>

          <Link to={ props.linkTo } className={ props.classNameRegister }>
            { props.textLink }
          </Link>
        </>

      ) : (
        <button 
          className={ props.className }
          type={ props.type }
          onClick={ props.onClick }
          disabled={ props.disabled }
          title={ props.title }
        >
          { props.children }
        </button>
      ) }
    </>
  )
}

Button.propTypes = {
  type: string,
  className: string,
  classNameSeparator: string,
  classNameRegister: string,
  onClick: func,
  separatorText: string,
  textLink: string,
  linkTo: string,
  // disabled: bool | number,
  title: string
}