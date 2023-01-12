import { useContextApi } from '../../context/hooks/useContextApi'
import { Navigate } from 'react-router-dom'

export function PrivateIsUserLogged({ children }) {
  const { isUserLogged } = useContextApi()

  return !isUserLogged ? children : <Navigate to='/' />
}