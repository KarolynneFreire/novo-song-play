import { array, bool, func, number, string } from 'prop-types'
import { createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { api } from '../services/api'

export const Context = createContext({})

export const ContextProvider = ({ children }) => {
  
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [isHiddenPassword, setIsHiddenPassword] = useState(false)
  const [nome, setNome] = useState('')  
  const [cpf, setCpf] = useState('')
  const [categoria, setCategoria] = useState('')
  const [user, setUser] = useState({})
  const [codigo, setCodigo] = useState(0)
  const [orquestra, setOrquestra] = useState([])
  const [sheetMusic, setSheetMusic] = useState([])
  const [isUserLogged, setIsUserLogged] = useState(false)
  const [codigoMaestro, setCodigoMaestro] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [userData, setUserData] = useState([])

  const navigate = useNavigate()

  const handleLogoutUser = async () => {
    
    try{
      const response = await api.post('/logout')

      if(response.status !== 200) {
        throw new Error('Ocorreu um erro inesperado.')
      }

      navigate('/')

      return response.data

    }catch(error) {
      console.log(error.name)
      return toast.error(error.error)
    }
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    setIsLoading(true)
    
    try{

      const userData = {
        email,
        senha
      }

      const { data } = await api.post('/login', userData)
      
      const dataNamePascalCase = data.nome
        .replace(/(\w)(\w*)/g, (_, greaterLetter1, greaterLetter2) => {
        return greaterLetter1.toUpperCase() + greaterLetter2.toLowerCase()
      })

      const isCategory = data.categoria === 'MUSICO' || 
                        data.categoria === 'MAESTRO' || 
                        data.categoria === 'ASSISTENTE'
      
      if(isCategory) {
        setIsLoading(false)
        setIsUserLogged(true)
        navigate('/')
        localStorage.setItem('user', JSON.stringify(data))
        setNome(data.nome)      
        setCategoria(data.categoria)
        setUser(data)
        return toast.success(`Bem vindo, ${dataNamePascalCase}.`)
      }

      setEmail('')
      setSenha('')

    }catch(error) {
      console.error(error.name)
      console.info(error.message)

      const { status } = error.request

      setIsLoading(false)
      
      if(status === 401) {
        setEmail('')
        setSenha('')
        return toast.error('Email ou senha incorreta')
      }

    }
  }

  useEffect(() => { 
    const loggedInUser = localStorage.getItem('user')
    if(loggedInUser) {
      const foundUser = JSON.parse(loggedInUser)
      setIsUserLogged(true)
      setUser(foundUser)
    }
  }, [])

  const handleSheetMusic = (sheetMusic) => {
    setSheetMusic(sheetMusic)
  }

  const handleLogout = async () => {
    setUser({})
    setIsLoading(false)
    setIsUserLogged(false)
    await handleLogoutUser()
    setCategoria('')
    setEmail('')
    setSenha('')
    localStorage.clear()
    toast.info('Usuário desconectado.')
  }

  const handleCpfMask = (cpf) => {
    return cpf
          .replace(/\D/g, '')
          .replace(/(\d{3})(\d)/, '$1.$2')
          .replace(/(\d{3})(\d)/, '$1.$2')
          .replace(/(\d{3})(\d{1,2})/, '$1-$2')
          .replace(/(-\d{2})\d+?$/, '$1')
  }
  
  const toggleHiddenPassword = (isHiddenPassword) => {
    setIsHiddenPassword(!isHiddenPassword)
  }

  return(
    <Context.Provider value={{
      toggleHiddenPassword, 
      isHiddenPassword,
      email,
      setEmail,
      senha, 
      setSenha,
      nome,
      categoria,
      handleCpfMask,
      cpf,
      setIsHiddenPassword,
      setNome,
      setCpf,
      setCategoria,
      orquestra,
      setOrquestra,
      user, 
      setUser,
      handleLogout,
      codigo, 
      setCodigo,
      sheetMusic,
      handleSheetMusic,
      handleLogin,
      isUserLogged,
      codigoMaestro, 
      setCodigoMaestro,
      isLoading, 
      setIsLoading,
      userData, 
      setUserData
    }}>
      { children }
    </Context.Provider>
  )
}

ContextProvider.propTypes = {
  children: array,
  email: string,
  senha: string,
  handlePassword: func,
  toggleHiddenPassword: func,
  isHiddenPassword: bool,
  handleName: func,
  nome: string,
  cpf: string,
  categoria: string,
  setIsHiddenPassword: func,
  setNome: func,
  setCpf: func,
  setCategoria: func,
  setEmail: func,
  setSenha: func,
  handleOrchestra: func,
  orquestra: array,
  setOrquestra: func,
  user: array, 
  setUser: func,
  handleLogout: func,
  codigo: number,
  setCodigo: func,
  sheetMusic: array,
  isLoading: bool, 
  setIsLoading: func,
  handleCpfMask: func,
  handleUserCode: func,
}