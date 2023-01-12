import { string, func, array } from 'prop-types'

export function Modal({ 
  children, 
  classNameModal, 
  classNameContainer, 
  classNameClose, 
  classNameContent, 
  onClose = () => {},
  id 
}) {

  const handleOutSideClick = (event) => {
    
    if(event.target.id === 'modal') {
      onClose()
    }
  }

  return (
    <section id={ id } className={ classNameModal } onClick={ handleOutSideClick }>
      <div className={ classNameContainer }>
        <button className={ classNameClose } onClick={ onClose } />
        <div className={ classNameContent }>
          { children }
        </div>
      </div>
    </section>
  )
}

Modal.propTypes = {
  children: array,
  onClose: func,
  classNameModal: string,
  classNameContainer: string,
  classNameClose: string,
  classNameContent: string,
  id: string
}