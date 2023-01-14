import classes from './styles/orchestra.module.css'

import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Image } from "../../../components/Image";
import { Input } from "../../../components/Input";
import { Title } from "../../../components/Title";
import trebleClef from '../../../images/music-notes.png'
import { useContextApi } from '../../../context/hooks/useContextApi'
import { Button } from "../../../components/Button";
import { api } from '../../../services/api'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useEffect } from 'react';
import { useState } from 'react';

export function Orchestra() {

  useEffect(() => {
    document.title = 'Cadastre uma orquestra'
  }, [])

  const [conductorName, setConductorsName] = useState('')
  const [data, setData] = useState([])
  
  const {
    nome,
    setNome,
  } = useContextApi()

  const navigate = useNavigate()
  
  useEffect(() => {
    const listConductors = async () => {
      try{
  
        const { data } = await api.get('/listarMaestro')
        setData(data)
        
        return data
  
      }catch(error) {
        console.error(error.message)
      }
    }
    
    listConductors()
  }, [])

  const listOrchestra = async () => {
    try {
      const response = await api.get('/listarOrquestras')

      return response.data
    } catch (error) {
      console.info(error.message)
      console.error(error.name)
    }
  }
  
  const saveOrchestra = async () => {
    try {
      
      const dataUserInput = {
        nome,
        codigoMaestro: {
          codigo: Number(conductorName)
        }
      }

      const orchestras = await listOrchestra()

      for(const orchestra of orchestras) {
        const { nome } = orchestra

        if(nome === dataUserInput.nome.toUpperCase()) {
          setNome('')
          setConductorsName('')
          return toast.info('Já exite uma orquestra com este nome.')
        }
      }
      
      const response = await api.post('/inserirOrquestra', dataUserInput)

      if(response.data === 'Salvo') {
        navigate('/maestro')
        setNome('')
        setConductorsName('')
        return toast.success('Orquestra criada com sucesso!')
      }

      setNome('')
      setConductorsName('')
      
      throw new Error('Ocorreu um erro. Por favor, tente novamente.')

    }catch(error) {
      console.error(error.message)

    }
    
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    saveOrchestra()
  }

  const isDisabled = !nome || !conductorName

  return (
    <section className="container-body-login">
      <Link to='/maestro' title='home'>
        <FaArrowLeft size={40} color='#131313' className="arrow-left" style={{ zIndex: 2 }} />
      </Link>

      <div className="container-login-register">
        
        <Image 
          className='container-image'
          src={ trebleClef }
          alt='Clave de Sol'
        />
        
        <div className={classes.form_container_orchestra}>


          <Title 
            classNameContainer='form-header'
            id='form-header-register'
            classNameTitle={`${classes.login_title} ${classes.create_orchestra_title}`}
            textTitle='Cadastre a orquestra'
          />

          <form method='post' onSubmit={handleSubmit} className={`form-login ${classes.form_register}`}>

            <Input 
              type='text'
              htmlFor='Nome da orquestra:'
              label='Nome da orquestra:'
              name='nome'
              placeholder="Orquestra"
              className="input-login"
              value={nome.trimStart()}
              onChange={(event) => setNome(event.target.value)}
            />

            <div className={classes.select_control}>
              <label htmlFor="maestro" className={classes.label_maestro}>Nome do maestro:</label>
              <select 
                  value={conductorName}
                  onChange={event => setConductorsName(event.target.value)}
                  className={classes.select_btn}
                >
                <option value="">--Selecione--</option>
                { data.map((data, index) => {

                  const { codigo, nome } = data
                  
                  return (
                    <option 
                      value={ codigo } 
                      key={ index }
                    >
                      { nome }
                    </option>
                  )
                }) }
              </select>
            </div>
            
            <Button 
              type='submit'
              className='button-login isButtonDisabled'
              disabled={ isDisabled }
            >
              Confirmar
            </Button>
            
          </form>
        </div>

      </div>
    </section>
  )
}