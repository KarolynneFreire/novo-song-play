import React, {useEffect, useState} from "react";
import axios from 'axios';
import { api } from '../../services/api';



const ListagemMusico = () => {
  
 
  const [partituras, SetPartituras] = useState([]);
  const [atualizar, setAtualizar] = useState([]);
  const [pesquisar, setPesquisar] = useState("");

 
 
  useEffect(()=>{
   buscarPartituras();
  },[]);

  async function buscarPartituras() {
    try {
      const result = await api.get('/listarPartitura')
      SetPartituras(result.data)

    } catch (error) {
      console.error(error.name)
      console.info(error.message)
    }
  }

  

  return (

    
    <div className="container listas ">
  <button onClick={buscarPartituras()}  data-bs-toggle="collapse" data-bs-target="#partitura"type="button" className="btn btn-color">Listar Todas Partituras</button>&nbsp;&nbsp;  

  <table id ="partitura" className="table collapse">
<input  type="text" className="form-control input-pesqu" placeholder="Pesquise por nome" aria-label="Recipient's username"
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
      <button onClick={("")} type="button" className="btn btn-color">Baixar</button>&nbsp;&nbsp;

     
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