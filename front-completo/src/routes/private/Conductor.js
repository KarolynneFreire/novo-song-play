import { useContextApi } from '../../context/hooks/useContextApi'
import { Navigate } from 'react-router-dom'

export function PrivateConductor({ children }) {

  const { user, isUserLogged } = useContextApi()
  
  return isUserLogged && 
        user.categoria === 'MAESTRO' || 
        user.categoria === 'ASSISTENTE' ? 
        children : <Navigate to='/' /> 
}