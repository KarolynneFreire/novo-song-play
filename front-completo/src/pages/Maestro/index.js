import { useEffect } from 'react';
import CapaUsuario from '../../components/CapaUsuario';
import FuncionalidadesMusc from '../../components/FuncionalidadesMusc';
import ListagensMaestro from '../../components/ListagensMaestro';
import '../Maestro/styles/index.css'
import { api } from '../../services/api';


export const Maestro = () => {

  
    return (
      <div>
          <CapaUsuario></CapaUsuario>
          <FuncionalidadesMusc></FuncionalidadesMusc>
          <ListagensMaestro></ListagensMaestro>
      </div>
    );
  };