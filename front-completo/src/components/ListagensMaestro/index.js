import React, {useEffect, useState} from "react";
import { api } from '../../services/api';
import { useContextApi } from "../../context/hooks/useContextApi";
import { useNavigate } from "react-router-dom";



const ListagensMaestro = () => {

  const { 
    user,
    setNome
  } = useContextApi()

  const navigatee = useNavigate()
  
  const [usuarios, SetUsuarios] = useState([]);
  const [orquestras, SetOrquestras] = useState([]);
  const [partituras, SetPartituras] = useState([]);
  // const [atualizar, setAtualizar] = useState([]);
  const [pesquisar, setPesquisar] = useState("");
  const navigate = useNavigate()

    const Erro = () => {
        navigatee('/erro')    
    }
 
  useEffect(()=>{
    buscarUsuarios();
  },[]);

  useEffect(() => {
    return () => setNome('')
  }, [])

  async function buscarUsuarios() {
    try {
      const result = await api.get('/listarUsuarios')
      SetUsuarios(result.data)

    } catch (error) {
      console.error(error.name)
      console.info(error.message)
    }
  }

  async function buscarOrquestras() {
    try {
      const result = await api.get('/listarOrquestras')
      SetOrquestras(result.data)

    } catch (error) {
      console.error(error.name)
      console.info(error.message)
    }
  }

  async function buscarPartituras() {
    try {
      const result = await api.get('/listarPartitura')
      SetPartituras(result.data)

    } catch (error) {
      console.error(error.name)
      console.info(error.message)
    }
  }

  // async function buscarPendentes() {
  //   try {
  //     const result = await api.get('/listarUsuariosPendentes')
  //     SetUsuarios(result.data)

  //   } catch (error) {
  //     console.error(error.name)
  //     console.info(error.message)
  //   }
  // }

  async function excluirUsuario(id) {
    try {
      const result = await api.post("/deletarUsuario/"+id)
      // setAtualizar(result.data)

      return result.data
    } catch (error) {
      console.error(error.name)
      console.info(error.message)
    }
  }

  async function excluirOrquestra(codigo) {
    try {
      const result = await api.post("/deleteOrquestra/"+codigo)
      // setAtualizar(result.data)

      return result.data
      
    } catch (error) {
      console.error(error.name)
      console.info(error.message)
    }
  }

  async function excluirPartituras(codigo) {
    try {
      const result = await api.post("/deletarPartitura/"+codigo)
      // setAtualizar(result.data)

      return result.data

    } catch (error) {
      console.error(error.name)
      console.info(error.message)
    }
  }

  // function buscarUsuarios(){
  //   api.get("/listarUsuarios").then(result=>{
  //     SetUsuarios(result.data);
  //   });
  // }

  // function buscarOrquestras(){
  //   api.get("/listarOrquestras").then(result=>{
  //     SetOrquestras(result.data);
  //   });
  // }

  // function buscarPartituras(){
  //   api.get("/listarPartitura").then(result=>{
  //     SetPartituras(result.data);
  //   });
  // }

  // function buscarPendentes(){
  //   api.get("/listarUsuariosPendentes").then(result=>{
  //     SetUsuarios(result.data);
  //   });
  // }

  // function excluirUsuario (id){
  //   api.post("/deletarUsuario/"+id).then(result=>{
  //     setAtualizar(result);
  //   });
  // }


  // function excluirOrquestra (codigo){
  //   api.post("/deleteOrquestra/"+codigo).then(result=>{
  //     setAtualizar(result);
  //  });
  // }

  // function excluirPartituras (codigo){
  //   api.post("/deletarPartitura/"+codigo).then(result=>{
  //     setAtualizar(result);
  //   });
  // }

  function editUsers(data) {
    const { codigo, email, categoria, cpf, nome } = data
    
    navigate(`/edit/user/${codigo}`)
    localStorage.setItem('id', codigo)
    localStorage.setItem('email', email)
    localStorage.setItem('category', categoria)
    localStorage.setItem('cpf', cpf)
    localStorage.setItem('name', nome)
  }

  function editOrchestra(data) {
    console.log(data)
    const { codigo, nome } = data
    console.log(codigo)
    
    navigate(`/edit/orchestra/${codigo}`)
    localStorage.setItem('id', codigo)
    localStorage.setItem('name', nome)
  }

  // function editSheetMusic(data) {
  //   const { codigo } = data
    
  //   navigate(`/edit/sheetMusic/${codigo}`)
  // }    

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
          <button onClick={()=> editUsers(serv)} type="button" className="btn btn-color">Editar</button>&nbsp;&nbsp;
          {/* <button onClick={()=>excluirUsuario(serv.codigo)} type="button" className="btn btn-color">Excluir</button>&nbsp;&nbsp; */}
          { user.email !== serv.email ? (
            <button onClick={()=>excluirUsuario(serv.codigo)} type="button" className="btn btn-color">Excluir</button>
          ) : (
            null
          )}
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
      <button onClick={()=> editOrchestra(orq)} type="button" className="btn btn-color">Editar</button>&nbsp;&nbsp;
      <button onClick={()=>excluirOrquestra(orq.codigo)} type="button" className="btn btn-color">Excluir</button>&nbsp;&nbsp;
      </td>
    </tr>
    </React.Fragment>
    ))
    }

  </tbody>
</table>


<table id ="partitura" className="table collapse">
<input  type="text" className="form-control input-pesqu" placeholder="Pesquise por orquestra ou maestro" aria-label="Recipient's username"
     aria-describedby="button-addon2"  onChange={(e)=>{
       setPesquisar(e.target.value);
     }}/>
  <tbody>
    <h3 className="titulo-list">Lista de todas as partituras</h3>
    <tr>
      <th scope="col">Nome</th>
      {/* <th scope="col">Compositor</th> */}
      <th scope="col">Opções</th>
    </tr>
    </tbody>

  <tbody>
    {
      partituras.filter(val=>{
        if (pesquisar === ''){
          return val;   
        } else if (
          val.nome.toLowerCase().includes(pesquisar.toLowerCase()) 
          // val.codigoMaestro.nome.toLowerCase().includes(pesquisar.toLowerCase())
        )  {
          return val
        }
      }).map(part=>(
      <React.Fragment key={part.id}>
    <tr>
      <td>{part.nome}</td>
      {/* <td>{part.compositor}</td> */}
      <td>
      {/* <button onClick={()=> editSheetMusic(part.codigo)} type="button" className="btn btn-color">Editar</button>&nbsp;&nbsp; */}
      <button onClick={()=>excluirPartituras(part.codigo)} type="button" className="btn btn-color">Excluir</button>&nbsp;&nbsp;
      <button onClick={Erro} type="button" className="btn btn-color">Visualizar</button>&nbsp;&nbsp;

     
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

