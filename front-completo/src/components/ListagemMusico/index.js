import React, {useEffect, useState} from "react";
import axios from 'axios';
import { api } from '../../services/api';



const ListagemMusico = () => {
  
 
  const [partituras, SetPartituras] = useState([]);
  const [atualizar, setAtualizar] = useState([]);
 
 
  useEffect(()=>{
   buscarPartituras();
  },[]);


 


  function buscarPartituras(){
    api.get("/listarPartituras").then(result=>{
      SetPartituras(result.data);
    });
  }

  



  return (

    
    <div className="container listas ">
  
    <button onClick={buscarPartituras()}  data-bs-toggle="collapse" data-bs-target="#partitura"type="button" className="btn btn-color">Listar Todas Partituras</button>&nbsp;&nbsp;
  

<table id ="partitura" className="table collapse">
  <thead>
    <h3 className="titulo-list">Lista de todas as partituras</h3>
    <tr>
      <th scope="col">Nome</th>
      <th scope="col">Compositor</th>
      <th scope="col">Opções</th>
    </tr>
  </thead>
  <tbody>
    {

    partituras.map(part=>(
      <React.Fragment key={part.codigo}>
    <tr>
      <td>{part.nome}</td>
      <td>{part.compositor}</td>
      <td>
      <button onClick={()=>""} type="button" className="btn btn-color">Baixar</button>&nbsp;&nbsp;
     
      </td>
    </tr>
    </React.Fragment>
    ))
    }

  </tbody>
</table>


    </div>

  );
  };
  
  export default ListagemMusico;