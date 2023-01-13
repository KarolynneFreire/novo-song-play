import { useNavigate } from 'react-router-dom'
import { Button } from "../../../../components/Button";
import trebleClef from '../../../../images/music-notes.png';
import { useContextApi } from '../../../../context/hooks/useContextApi'
import { toast } from "react-toastify";
import { FaArrowLeft } from 'react-icons/fa'
import { Link } from 'react-router-dom';
import { Image } from '../../../../components/Image';
import { Title } from '../../../../components/Title';
import { Input } from '../../../../components/Input';
import { api } from '../../../../services/api'
import { useEffect, useState } from 'react';
import { Loading } from '../../../../components/Loading'
import { useParams } from 'react-router-dom'

export function UserUpdate() {

  useEffect(() => {
    document.title = 'Atualizar cadastro'
  }, [])

  const navigate = useNavigate()

  const { id } = useParams()
  
  const { 
    email,
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
    setIsLoading,
    setCodigo,
    userData,
    setUserData
  } = useContextApi()

  console.log(userData)

  const [data, setData] = useState([])

  const isDisabled = !nome || 
                    !email || 
                    !categoria ||
                    !cpf                   

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

  useEffect(() => {
    const getUsers = async () => {
      try {
        const { data } = await api.get(`/listarUsuarios`)
        // setData(data)
        
        // let convert = data.reduce((obj, item) => ((obj[item.key] = item.value), obj), {})
        // convert = Object.assign({data: data}, convert)   
        // setData(convert)
        // console.log(data)
        
        // setNome(Object.assign({}, data.nome))
        
        for(const editData of data) {
          const { nome, cpf, categoria, email } = editData
  
          setNome(nome)
          setCpf(cpf)
          setCategoria(categoria)
          setEmail(email)
        }
  
        return data
        
      } catch (error) {
        console.error(error.name)  
        console.info(error.message)
      }
      
    }

    getUsers()
  }, [])

  
  const editUser = async () => {

    setIsLoading(true)

    try{

      const dataUser = {
        nome,
        email,
        categoria,
        cpf,
        codigo: Number(id)
      }

      const response = await api.post('/inserirUsuario', dataUser) 

      makeCategoryList(dataUser.categoria)

      if(response.status === 200) {
        setIsLoading(false)
        
        navigate('/maestro')
        
        return toast.success('Dados do usuário atualizado com sucesso!', {
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

    }catch(error) {
      console.error(error.name)

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
    await editUser()
  }

  const handleChange = (event) => {
    setCpf(handleCpfMask(event.target.value))
  }

  const categorys = makeCategoryList()

  return (
    <section className="container-body-login container-body-register">

      <Link to='/maestro' title='maestro'>
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
            textTitle='Atualizar cadastro'
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

            <Button 
              type='submit'
              className='button-login isButtonDisabled'
              disabled={ isDisabled }
            >
              Salvar
            </Button>
            
          </form>

          { isLoading ? <Loading /> : null }

        </div>

      </div>
    </section>
  )  
}