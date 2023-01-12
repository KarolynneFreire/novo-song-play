import React from "react";
import { useContextApi } from "../../context/hooks/useContextApi";
import Logo from "./../../images/logo.png"


const CapaUsuario = () => {

  const { user } = useContextApi() 
  
  return (
      <div>
    <div className="usuario text-center">
        <div className="intro_user">
        <img src={Logo} alt="Logo do Song Play"></img>
          <h1> Olá, { user.nome }</h1>
        </div>
      </div>
 </div>

  );
};

export default CapaUsuario;