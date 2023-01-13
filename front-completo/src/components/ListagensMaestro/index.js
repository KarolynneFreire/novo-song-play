import React, {useEffect, useState} from "react";
import axios from 'axios';
import { api } from '../../services/api';



const ListagensMaestro = () => {
  
  const [usuarios, SetUsuarios] = useState([]);
  const [orquestras, SetOrquestras] = useState([]);
  const [partituras, SetPartituras] = useState([]);
  const [atualizar, setAtualizar] = useState([]);
  const [pesquisar, setPesquisar] = useState("");
  
 
 
  useEffect(()=>{
   buscarUsuarios();
  },[]);


  function buscarUsuarios(){
    api.get("/listarUsuarios").then(result=>{
      SetUsuarios(result.data);
    });
  }

function buscarOrquestras(){
    api.get("/listarOrquestras").then(result=>{
      SetOrquestras(result.data);
    });
  }

  function buscarPartituras(){
    api.get("/listarPartitura").then(result=>{
      SetPartituras(result.data);
    });
  }

  function buscarPendentes(){
    api.get("/listarUsuariosPendentes").then(result=>{
      SetUsuarios(result.data);
    });
  }

  function excluirUsuario (id){
    api.post("/deletarUsuario/"+id).then(result=>{
    setAtualizar(result);
  });
    }


    function excluirOrquestra (codigo){
      api.post("/deleteOrquestra/"+codigo).then(result=>{
      setAtualizar(result);
    });
      }

      function excluirPartituras (codigo){
        api.post("/deletarPartitura/"+codigo).then(result=>{
        setAtualizar(result);
      });
        }

       

       


  return (

    <div className="container listas">
    <button onClick={buscarUsuarios()} type="button" data-bs-toggle="collapse" data-bs-target="#usuario" className="btn btn-color">Listar Todos Usuarios</button>&nbsp;&nbsp;
    <button onClick={buscarPartituras()}  data-bs-toggle="collapse" data-bs-target="#partitura"type="button" className="btn btn-color">Listar Todas Partituras</button>&nbsp;&nbsp;
    <button onClick={buscarOrquestras()} type="button" data-bs-toggle="collapse" data-bs-target="#orquestra" className="btn btn-color">Listar Todas Orquestras</button>&nbsp;&nbsp;
    {/* <button onClick={buscarPendentes()}type="button" data-bs-toggle="collapse" data-bs-target="#usuario" className="btn btn-secondary">Usuarios Pendentes</button>&nbsp;&nbsp; */}

    
    <table id ="usuario" className="table collapse">
    <input  type="text" className="form-control input-pesqu" placeholder="Pesquise por nome ou email" aria-label="Recipient's username"
     aria-describedby="button-addon2"  onChange={(e)=>{
       setPesquisar(e.target.value);
     }}/>
  <tbody>
    <h3 className="titulo-list">Lista de todos os usuários</h3>
    <tr>
      <th scope="col">Nome</th>
      <th scope="col">Categoria</th>
      <th scope="col">Email</th>
      <th scope="col">Opções</th>
    </tr>
    </tbody>
  <tbody>
    {

    usuarios.filter(val=>{
      if (pesquisar === ''){
        return val;   
      } else if (
        val.nome.toLowerCase().includes(pesquisar.toLowerCase()) ||
        val.email.toLowerCase().includes(pesquisar.toLowerCase())
      )  {
        return val
      }
    }).map( serv=>(
      <React.Fragment key={serv.codigo}>
    <tr>
      <td>{serv.nome}</td>
      <td>{serv.categoria}</td>
      <td >{serv.email}</td>
      <td>
      <button onClick={()=>SetUsuarios(serv)} type="button" className="btn btn-color">Editar</button>&nbsp;&nbsp;
      <button onClick={()=>excluirUsuario(serv.codigo)} type="button" className="btn btn-color">Excluir</button>&nbsp;&nbsp;
      </td>
    </tr>
    </React.Fragment>
    ))
    }

  </tbody>
</table>
<table id ="orquestra" className="table collapse">
<input  type="text" className="form-control input-pesqu" placeholder="Pesquise por orquestra ou maestro" aria-label="Recipient's username"
     aria-describedby="button-addon2"  onChange={(e)=>{
       setPesquisar(e.target.value);
     }}/>
  <tbody>
  <h3 className="titulo-list">Lista de todas as orquestras</h3>
    <tr>
      <th scope="col">Nome da Orquestra</th>
      <th scope="col">Nome do Maestro</th>
      <th scope="col">Opções</th>
    </tr>
    </tbody>

  <tbody>
    {

    orquestras.filter(val=>{
      if (pesquisar === ''){
        return val;   
      } else if (
        val.nome.toLowerCase().includes(pesquisar.toLowerCase()) ||
        val.codigoMaestro.nome.toLowerCase().includes(pesquisar.toLowerCase())
      )  {
        return val
      }
    }).map(orq=>(
      <React.Fragment key={orq.codigo}>
    <tr>
      <td>{orq.nome}</td>
      <td>{orq.codigoMaestro.nome}</td>
      <td>
      <button onClick={()=>SetOrquestras(orq)} type="button" className="btn btn-color">Editar</button>&nbsp;&nbsp;
      <button onClick={()=>excluirOrquestra(orq.codigo)} type="button" className="btn btn-color">Excluir</button>&nbsp;&nbsp;
      </td>
    </tr>
    </React.Fragment>
    ))
    }

  </tbody>
</table>


<table id ="partitura" className="table collapse">
  <tbody>
    <h3 className="titulo-list">Lista de todas as partituras</h3>
    <tr>
      <th scope="col">Nome</th>
      <th scope="col">Compositor</th>
      <th scope="col">Opções</th>
    </tr>
    </tbody>

  <tbody>
    {

    partituras.map(part=>(
      <React.Fragment key={part.id}>
    <tr>
      <td>{part.nome}</td>
      <td>{part.compositor}</td>
      <td>
      <button onClick={()=>SetPartituras(part)} type="button" className="btn btn-color">Editar</button>&nbsp;&nbsp;
      <button onClick={()=>excluirPartituras(part.codigo)} type="button" className="btn btn-color">Excluir</button>&nbsp;&nbsp;

     
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
  
  export default ListagensMaestro;

