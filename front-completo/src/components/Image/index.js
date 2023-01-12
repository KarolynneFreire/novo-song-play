import { string } from 'prop-types'

export function Image(props) {
  return (
    <div className={props.className} id={ props.id }>
      <img src={props.src} alt={props.alt} />
    </div>
  )
}

Image.propTypes = {
  className: string,
  src: string,
  alt: string,
  id: string
}