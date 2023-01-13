import './styles/index.css'

import { useNavigate } from 'react-router-dom'
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { Button } from "../../../components/Button";
import trebleClef from '../../../images/music-notes.png';
import { useContextApi } from '../../../context/hooks/useContextApi'
import { toast } from "react-toastify";
import { FaArrowLeft } from 'react-icons/fa'
import { Link } from 'react-router-dom';
import { Image } from '../../../components/Image';
import { Title } from '../../../components/Title';
import { Input } from '../../../components/Input';
import { api } from '../../../services/api'
import { useState } from 'react';
import { Loading } from '../../../components/Loading'

export function Users() {

  document.title = 'Cadastre-se'
  
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isHiddenConfirmPassword, setIsHiddenConfirmPassword] = useState(false)
  
  const navigate = useNavigate()
  
  const { 
    toggleHiddenPassword, 
    isHiddenPassword,
    email,
    senha,
    nome,
    categoria,
    setSenha,
    setEmail,
    cpf,
    setIsHiddenPassword,
    setNome,
    setCpf,
    setCategoria,
    handleCpfMask,
    isLoading, 
    setIsLoading
  } = useContextApi()
  console.log(categoria)

  const toggleHiddenConfirmPassword = (isHiddenConfirmPassword) => {
    setIsHiddenConfirmPassword(!isHiddenConfirmPassword)
  }
  
  const isDisabled = !nome || 
                    !email || 
                    !categoria ||
                    !cpf ||
                    !confirmPassword||
                    !senha ||
                    senha.length !== confirmPassword.length                    

  const makeCategoryList = (categoryList) => {
    categoryList = [
      'MAESTRO', 
      'ASSISTENTE', 
      'MUSICO'
    ]

    let getOneCategory = []

    for(const category of categoryList) {
      switch(category) {
        case 'MAESTRO':
          getOneCategory.push(category)
        break

        case 'ASSISTENTE':
          getOneCategory.push(category)
        break

        case 'MUSICO':
          getOneCategory.push(category)
        break

        default:
          console.log('Nada para mostrar.')
        }
        
      }
      
    return getOneCategory
  }

  const listUsers = async () => {
    try {
      const { data } = await api.get('/listarUsuarios')
  
      return data
      
    } catch (error) {
      console.error(error.name)      
      console.info(error.message)
    }
  }

  const createUser = async () => {

    setIsLoading(true)

    try{

      const data = {
        nome,
        email,
        categoria,
        cpf,
        senha,
      }

      const users = await listUsers()

      for(const user of users) {
        
        if(user.cpf === data.cpf) {
          navigate('/register/users')
          setIsLoading(false)
          setConfirmPassword('')
          return toast.info('O CPF informado já existe.')
        }

        if(user.email === data.email) {
          navigate('/register/users')
          setIsLoading(false)
          setConfirmPassword('')
          return toast.info('O email informado já existe.')
        }
      }

      if(data.senha !== confirmPassword) {
        setIsLoading(false)
        setConfirmPassword('')
        return toast.info('A confirmação da senha deve ser igual a senha definida. Por favor, tente novamente.' , {
          position: "top-right",
          autoClose: 7000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          className: 'login-toast-info'
        })
      }
      
      const response = await api.post('/inserirUsuario', data) 

      makeCategoryList(data.categoria)

      // if(data.categoria === 'MAESTRO' || data.categoria === 'ASSISTENTE') {
      //   setIsLoading(false)
      //   navigate('/register/orchestra')

      //   toast.success('Cadastro realizado com sucesso!')

      //   return toast.info('Crie uma orquestra.') 
      // }

      if(response.status === 200) {
        setIsLoading(false)
        
        navigate('/login')
        
        return toast.success('Cadastro realizado com sucesso!', {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          className: 'login-toast-info'
        });
      }

      // setIsLoading(true)

    }catch(error) {
      console.error(error.name)
      setConfirmPassword('')

      const { status } = error.request
      
      setIsLoading(false)
      
      if(status === 400) {
        return toast.error('Informe um CPF válido.')
      }

      return toast.error(error.message)
    }

  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setCategoria('')
    setEmail('')
    setSenha('')
    setIsHiddenPassword(false)
    setNome('')
    setCpf('')
    await createUser()
  }

  const handleChange = (event) => {
    setCpf(handleCpfMask(event.target.value))
  }

  const categorys = makeCategoryList()

  return (
    <section className="container-body-login container-body-register">
      <Link to='/login' title='Login'>
        <FaArrowLeft size={40} color='#131313' className="arrow-left" />
      </Link>

      <div className="container-login-register register-screen">

        <Image 
          className='container-image'
          src={ trebleClef }
          alt='Clave de Sol'
        />
        
        <div className="form-container">
          <Title 
            classNameContainer='form-header'
            id='form-header-register'
            classNameTitle='login-title'
            textTitle='Cadastre-se'
          />

          <form method='post' onSubmit={handleSubmit} className='form-login' id='form-register'>

            <Input 
              type='text'
              name='nome'
              placeholder="Nome"
              value={nome.trimStart()}
              htmlFor='nome'
              label='Nome:'
              onChange={(event) => setNome(event.target.value)}
            />

            <Input 
              type='text'
              name='cpf' 
              placeholder='CPF'
              htmlFor='cpf'
              label='CPF:'
              maxLength={14}
              value={cpf}
              onChange={handleChange}
            />

            <div className="category-container">
              <label htmlFor="categoria" className='category-label'>Categoria:</label>
              <select 
                value={categoria}
                name='categoria'
                id='select-category'
                className="select"
                onChange={event => setCategoria(event.target.value)}
              >
                <option value="">--Selecione--</option>
                { categorys.map((category, index) => {

                  return (
                    <option 
                      value={category}
                      key={index}
                    >
                      { category === 'MAESTRO' ? 'Maestro' : null }
                      { category === 'ASSISTENTE' ? 'Assistente' : null }
                      { category === 'MUSICO' ? 'Músico' : null }
                    </option>
                  )
                }) }
              </select>
            </div>

            <Input 
              type='email' 
              name='email'
              placeholder='E-mail'
              value={email}
              htmlFor='E-mail'
              label='E-mail:'
              onChange={(event) => setEmail(event.target.value)}
            />

            <Input 
              isInputPassword
              name='senha'
              value={ senha.trimStart() }
              onChange={(event => setSenha(event.target.value))}
              placeholder='Senha'
              classNameInput='input-password'
              onClick={() => toggleHiddenPassword(isHiddenPassword)}
              typeBtn='button'
              typeInput={ isHiddenPassword ? 'text' : 'password' }
              label='Senha:'
              htmlFor='Senha'
              isHiddenPassword={ 
                isHiddenPassword ? (
                  <BsEye size={20} />
                ) : (
                  <BsEyeSlash size={20} />
                ) }
            />
          
            <Input 
              isInputPassword
              name='confirm-password'
              value={ confirmPassword.trimStart() }
              onChange={(event => setConfirmPassword(event.target.value))}
              placeholder='Confirmação da Senha'
              classNameInput='input-password'
              onClick={() => toggleHiddenConfirmPassword(isHiddenConfirmPassword)}
              typeBtn='button'
              typeInput={ isHiddenConfirmPassword ? 'text' : 'password' }
              htmlFor='confirm-senha'
              label='Confirme a sua senha:'
              isHiddenPassword={ 
                isHiddenConfirmPassword ? (
                  <BsEye size={20} />
                ) : (
                  <BsEyeSlash size={20} />
                ) }
            />

            <Button 
              type='submit'
              className='button-login isButtonDisabled'
              disabled={ isDisabled }
            >
              Confirmar
            </Button>
            
          </form>

          { isLoading ? <Loading /> : null }

        </div>

      </div>
    </section>
  )  
}