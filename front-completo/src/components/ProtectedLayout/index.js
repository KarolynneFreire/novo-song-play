import { Navigate } from 'react-router-dom'
import { useContextApi } from '../../context/hooks/useContextApi'

export const ProtectedLayout = ({ children }) => {
  const { user } = useContextApi()

  console.log(user.categoria)

  if(user.categoria === 'MAESTRO' || user.categoria === 'ASSISTENTE') {
    return children
  }

  return <Navigate to='/' />
}