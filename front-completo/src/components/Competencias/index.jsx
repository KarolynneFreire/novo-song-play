import './styles.css'

const Competencias = () => {
  return (
    <div className="diferenciais container">
      <ul className="diferenciais__lista">
        <li className="diferenciais__item diferenciais__item--tempo">
          <h2 className="item__titulo">Tempo</h2>
          <p className="item__texto">
            Tempo é importante! Trabalhamos em ritmo acelerado, atendendo rigorosamente aos prazos de atualizações
          </p>
        </li>
        <li className="diferenciais__item diferenciais__item--foco">
          <h2 className="item__titulo"> Foco</h2>
          <p className="item__texto"> Estaremos empreendendo!     Ofereceremos planos de qualidade com preços acessíveis.
          </p>
        </li>
        <li className="diferenciais__item diferenciais__item--especialistas">
          <h2 className="item__titulo"> Especialistas</h2>
          <p className="item__texto">
            Equipe experiente e especializada! Testamos todos os produtos antes do lançamento.
          </p>
        </li>
      </ul>
    </div>

  );
};

export default Competencias;