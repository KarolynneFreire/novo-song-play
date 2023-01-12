import { string } from 'prop-types'

export function Profile(props) {
  return (
    <div className={ props.classNameContainer }>
      <img className={ props.classNameImg } src={ props.src } alt={ props.alt } />
    </div>
  )
}

Profile.propTypes = {
  classNameImg: string,
  classNameContainer: string,
  src: string,
  alt: string
}