import ReactLoading from 'react-loading'
import classes from './styles/loading.module.css'

export function Loading() {
  return (
    <div className={ classes.container }>
      <ReactLoading type='spin' color='#8d4925' height={115} width={115} />
    </div>
  )
}