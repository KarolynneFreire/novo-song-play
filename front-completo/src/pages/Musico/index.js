import { useEffect } from 'react';
import CapaUsuario from '../../components/CapaUsuario';
import ListagemMusico from '../../components/ListagemMusico';
import '../Musico/styles/index.css'



export const Musico = () => {
    useEffect(() => {
      document.title = 'Músico'
    }, [])
  
    return (
      <div>
          <CapaUsuario></CapaUsuario>
          <ListagemMusico></ListagemMusico>
      </div>
    );
  };