import { bool, string } from 'prop-types'

export function Title(props) {
  return (
    <header className={ props.classNameContainer } id={ props.id }>

      { props.isTitleLogin ? (
        <>
          <h1 className={ props.classNameTitle }>{ props.textTitle }</h1>
          <h3 className={ props.classNameSubtitle }>{ props.textSubtitle }</h3>
        </>
      ) : (
        <h1 className={ props.classNameTitle }>
          { props.textTitle }
        </h1>
      ) }
      
    </header>
  )
}

Title.propTypes = {
  classNameTitle: string,
  classNameSubtitle: string,
  classNameContainer: string,
  textTitle: string,
  textSubtitle: string,
  isTitleLogin: bool,
  id: string
}