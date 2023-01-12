import './styles.css'
import { Link } from "react-router-dom";
import { useContextApi } from '../../context/hooks/useContextApi'

const Planos = () => {

  const { isUserLogged } = useContextApi()
  
  return (
    <div>
      <section className="planos container">
        <h2 className="planos__titulo">Cadastros</h2>
        <ul className="planos__cartoes">
          <li className="cartao cartao--start">
            <h3 className="cartao__titulo">Músico</h3>
            <article className="cartao__conteudo">
              <p className="cartao__preco">
                <em>Benefícios</em>
              </p>
              <p className="cartao__texto">
                Visualiza partituras
              </p>
              <p className="cartao__texto">
                Particida de orquestras
              </p>
              <p className="cartao__texto">
                Consegue baixar partituras
              </p>

              { isUserLogged ? (
                null
              ) : (
                <Link 
                  to="/register/users" 
                  className="cartao__botao cartao__botao--start botao"
                >
                  Quero me Cadastrar
                </Link>
              ) }
              
            </article>
          </li>
          <li className="cartao cartao--ultra">
            <h3 className="cartao__titulo">Maestro</h3>
            <article className="cartao__conteudo">
              <p className="cartao__preco">
                <em>Benefícios</em>
              </p>
              <p className="cartao__texto">
                Autoriza o cadastro de músicos a sua orquestra
              </p>
              <p className="cartao__texto">
                Autoriza o cadastro de Partituras/Orquestras 
              </p>
              <p className="cartao__texto">
                Edita/Exclui qualquer dados a sua orquestra
              </p>

              { isUserLogged ? (
                null
              ) : (
                <Link 
                  to="/register/users" 
                  className="cartao__botao cartao__botao--ultra botao"
                >
                  Quero me Cadastrar
                </Link>  
              ) }
              
              
            </article>
          </li>
          <li className="cartao cartao--mega">
            <h3 className="cartao__titulo">Assistente</h3>
            <p className="cartao__preco">
              <em>Benefícios</em>
            </p>
            <article className="cartao__conteudo">
              <p className="cartao__texto">
                Auxilia o Maestro
              </p>
              <p className="cartao__texto">
                Cadastra partituras
              </p>
              <p className="cartao__texto">
                Cadastra orquestras
              </p>

              { isUserLogged ? (
                null
              ) : (
                <Link 
                  to="/register/users" 
                  className="cartao__botao cartao__botao--mega botao"
                >
                  Quero me Cadastrar
                </Link>
              ) }
              
            </article>
          </li>
        </ul>
      </section>

    </div>
  );
};


export default Planos;