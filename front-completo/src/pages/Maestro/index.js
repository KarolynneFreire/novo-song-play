import { useEffect } from 'react';
import CapaUsuario from '../../components/CapaUsuario';
import FuncionalidadesMusc from '../../components/FuncionalidadesMusc';
import ListagensMaestro from '../../components/ListagensMaestro';
import '../Maestro/styles/index.css'


export const Maestro = () => {

  useEffect(() => {
    document.title = 'Maestro'
  }, [])
  
    return (
      <div>
          <CapaUsuario></CapaUsuario>
          <FuncionalidadesMusc></FuncionalidadesMusc>
          <ListagensMaestro></ListagensMaestro>
      </div>
    );
  };