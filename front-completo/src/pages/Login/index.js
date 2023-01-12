import './styles/index.css';

import { useEffect } from 'react';
import { BsEye, BsEyeSlash } from 'react-icons/bs';
import { FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { Button } from "../../components/Button";
import { Image } from '../../components/Image';
import { Input } from '../../components/Input';
import { Title } from '../../components/Title';
import { useContextApi } from '../../context/hooks/useContextApi';
import trebleClef from '../../images/music-notes.png';
import { Loading } from '../../components/Loading'

export function Login() {

  useEffect(() => {
    document.title = 'Login'
  }, [])

  const { 
    toggleHiddenPassword, 
    isHiddenPassword,
    email,
    senha,
    setEmail,
    setSenha,
    handleLogin,
    isLoading
  } = useContextApi()

  const isDisabled = !email || !senha
  
  return(
    <>
      <section className="container-body-login">

        <Link to='/' title='Home'>
          <FaArrowLeft size={40} color='#131313' className="arrow-left" />
        </Link>

        <div className="container-login-register">
          <Image 
            className='container-image'
            src={trebleClef}
            alt='Clave de Sol'
          />
          
          <div className="form-container">

            <Title 
              classNameContainer='form-header'
              classNameTitle='login-title'
              classNameSubtitle='login-subtitle'
              textTitle='Login'
              textSubtitle='Se você já está cadastrado, faça o seu login.'
              isTitleLogin
            />

            <form onSubmit={handleLogin} className='form-login'>

              <Input 
                type='email'
                placeholder='E-mail'
                value={email}
                onChange={(event => setEmail(event.target.value))}                
                htmlFor='E-mail'
                label='E-mail:'
              />

              <Input 
                isInputPassword
                value={ senha }
                onChange={(event => setSenha(event.target.value))}
                placeholder='Senha'
                onClick={() => toggleHiddenPassword(isHiddenPassword)}
                typeBtn='button'
                typeInput={ isHiddenPassword ? 'text' : 'password' }
                htmlFor='senha'
                label='Senha:'
                isHiddenPassword={ 
                  isHiddenPassword ? (
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
                Entrar
              </Button>

              <Button 
                classNameRegister='register-button'
                linkTo='/register/users'
                textLink='Cadastre-se'
                separatorText='ou'
                classNameSeparator='separator'
                isLoginScreen
              />
              
            </form>

          { isLoading ? <Loading /> : null }
            
          </div>

        </div>
      </section>
    </>
  )
}