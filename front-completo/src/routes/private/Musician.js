import { useContextApi } from '../../context/hooks/useContextApi'
import { Navigate } from 'react-router-dom'

export function PrivateMusician({ children }) {
  const { user, isUserLogged } = useContextApi()

  console.log('private musician: ', isUserLogged)
  
  return isUserLogged && 
        user.categoria === 'MUSICO' ? 
        children : <Navigate to='/' />
}