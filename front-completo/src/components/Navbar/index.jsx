import { Link } from "react-router-dom";
import { useContextApi } from '../../context/hooks/useContextApi'

const Navbar = () => {

  const { 
    handleLogout, 
    isUserLogged,
    user
  } = useContextApi()

  return (
    <div>
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <button 
            className="navbar-toggler" 
            type="button" 
            data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" 
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div 
            className="collapse navbar-collapse" id="navbarNavAltMarkup"
          >
            <div className="navbar-nav mx-auto">

              <Link 
                className="nav-link active" 
                aria-current="page" 
                to="/"
              >
                Home
              </Link>
              <Link 
                className="nav-link" 
                to="/sobre"
              >
                Sobre
              </Link>

              { isUserLogged ? (
                <Link
                  className="nav-link"
                  to={ 
                    user.categoria === 'MUSICO' ? '/musico' : '/maestro' 
                  }
                >
                  { user.categoria === 'MUSICO' ? 'Músico' : 'Maestro' }
                </Link>
              ) : (
                null
              ) }

              { isUserLogged ? (
                <Link 
                  className="nav-link"
                  onClick={handleLogout}
                >
                  Sair
                </Link>
              ) : (
                <Link 
                  className="nav-link" 
                  to="/login"
                  >
                  Login
                </Link>
              ) }
              
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};


export default Navbar;