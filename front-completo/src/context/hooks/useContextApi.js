import { useContext } from 'react'
import { Context } from '../Context'

export const useContextApi = () => {
  return useContext(Context)
}