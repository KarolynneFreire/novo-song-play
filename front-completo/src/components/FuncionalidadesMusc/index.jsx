import { useNavigate } from 'react-router-dom'

const FuncionalidadesMusc = () => {

    const navigate = useNavigate()

    const handleRegisterSheetMusic = () => {
        navigate('/register/sheetMusic')    
    }

    // const handleRegisterMusician = () => {
        // navigate('/register/users')
    // }

    const handleRegisterOrchestra = () => {
        navigate('/register/orchestra')
    }
    
    return (

        <div className = "container btn-maestro">
            <button type="button" className="btn btn-lg btn-funcionalidade"  onClick={handleRegisterSheetMusic}>Cadastrar Partituras</button>
            {/* <button type="button" className="btn btn-lg btn-funcionalidade"  onClick={handleRegisterMusician}>Cadastrar Músico</button> */}
            <button type="button" className="btn btn-lg btn-funcionalidade"  onClick={handleRegisterOrchestra}>Cadastrar Orquestra</button>
        </div>
    );
  };
  
  export default FuncionalidadesMusc;