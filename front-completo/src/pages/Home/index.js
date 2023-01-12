import './styles/index.css';
import Competencias from "../../components/Competencias";
import Planos from "../../components/Planos";
import CapaHome from '../../components/CapaHome';
import QuemSomos from '../../components/QuemSomos';
import { useEffect } from 'react';


export const Home = () => {
  useEffect(() => {
    document.title = 'Home'
  }, [])

  return (
    <div>
      <CapaHome></CapaHome>
      <Competencias></Competencias>
      <QuemSomos></QuemSomos>
      <Planos></Planos>
    </div>
  );
};