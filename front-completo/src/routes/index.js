import { Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { ErrorBoundary } from '../components/Error/ErrorBoundary'
import { ContextProvider } from '../context/Context'
import Navbar from '../components/Navbar'
import { Home } from '../pages/Home'
import { Sobre } from '../pages/Sobre'
import { Login } from '../pages/Login'
import { Musico } from '../pages/Musico'
import { Maestro } from '../pages/Maestro'
import { Users } from '../pages/Register/Users'
import { SheetMusic } from '../pages/Register/SheetMusic'
import { Orchestra } from '../pages/Register/Orchestra'
import Footer from '../components/Footer'
import { UserUpdate } from '../pages/Register/Update/User'
import { OrchestraUpdate } from '../pages/Register/Update/Orchestra'
import { SheetMusicUpdate } from '../pages/Register/Update/SheetMusic'
// import { ProtectedLayout } from '../components/ProtectedLayout'

export function AllRoutes() {

  return (
    <>
      <ErrorBoundary>
        <ToastContainer
          autoClose={5000}
          className='toast-container'
        />
        <ContextProvider>
          <Navbar />
          <Routes>
            <Route path='/' element={ <Home /> } />
            <Route path='/sobre' element={ <Sobre /> } />
            <Route path='/login' element={ 
              <Login /> 
            } />
            <Route path='/home' element={ <Home /> } />
            <Route path='/musico' element={ 
              <Musico />
            } 
            />
            <Route path='/maestro' element={ 
              <Maestro /> 
            } />
            <Route path='/register/users' element={ <Users /> } />
            <Route path='/register/sheetMusic' element={
              <SheetMusic /> 
            } />
            <Route path='/register/orchestra' element={ 
              <Orchestra /> 
            } />
            <Route path='/edit/user/:id' element={ <UserUpdate /> } /> 
            <Route path='/edit/orchestra/:id' element={ <OrchestraUpdate /> } />
            <Route path='/edit/sheetMusic/:id' element={ <SheetMusicUpdate /> } />
          </Routes>
          <Footer />
        </ContextProvider>
      </ErrorBoundary>
    </>
  )
}