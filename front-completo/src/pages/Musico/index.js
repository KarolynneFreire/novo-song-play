import { useEffect } from 'react';
import CapaUsuario from '../../components/CapaUsuario';
import ListagemMusico from '../../components/ListagemMusico';
import PesquisaPartitura from '../../components/PesquisaPartitura';
import '../Musico/styles/index.css'



export const Musico = () => {
    useEffect(() => {
      document.title = 'Músico'
    }, [])
  
    return (
      <div>
          <CapaUsuario></CapaUsuario>
          <PesquisaPartitura></PesquisaPartitura>
          <ListagemMusico></ListagemMusico>
      </div>
    );
  };