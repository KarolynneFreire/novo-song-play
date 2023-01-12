
import { useEffect } from 'react';
import HistoriaSobre from '../../components/HistoriaSobre';
import Pessoas from '../../components/Pessoas';
import './styles/index.css';


export const Sobre = () => {

  useEffect(() => {
    document.title = 'Sobre'
  }, [])
  
  return (
    <div>
        <HistoriaSobre></HistoriaSobre>
        <Pessoas></Pessoas>
    </div>
  );
};