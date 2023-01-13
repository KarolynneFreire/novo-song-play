import { Link } from "react-router-dom";

const QuemSomos = () => {
  return (
    <div>
      <section className="sobre container">
        <div className="sobre__conteudo">
          <h2 className="sobre__titulo">Sobre</h2>
        <p className="sobre__texto">
          Armazenamos qualquer tipo de partituras 
          <strong className="sobre__texto--destaque"> para auxiliar sua orquesta</strong>!
        </p>
        <p className="sobre__texto">
          O armazenamento de um arquivo não pode ser um custo extra para o cliente. Na SongPlay, você se cadastra no nosso serviço 
          e a manutenção já está inclusa. Assim, você não se preocupa com o armazenamento, é tudo por nossa conta.
        </p>
        <p className="sobre__texto sobre__texto--destaque sobre__texto--divisao">
          Conte com uma equipe especializada e exclusiva pra melhorar a sua experiência.
        </p>
        <p className="sobre__texto">
          Estamos em algumas plataformas:
        </p>
              
        <section className="mb-4">
          <Link 
            className="btn btn-outline-light btn-floating m-1 icone-sobre" 
            to="#!" 
            role="button"
          >
            <i className="bi bi-facebook"></i>
          </Link>

          <Link 
            className="btn btn-outline-light btn-floating m-1 icone-sobre" 
            href="#!" 
            role="button"
          >
            <i className="bi bi-twitter"></i>
          </Link>

          <Link 
            className="btn btn-outline-light btn-floating m-1 icone-sobre" 
            to="#!" 
            role="button"
          >
            <i className="bi bi-google"></i>
          </Link>

          <Link 
            className="btn btn-outline-light btn-floating m-1 icone-sobre" 
            to="#!" 
            role="button"
          >
            <i className="bi bi-instagram"></i>
          </Link>

          <Link 
            className="btn btn-outline-light btn-floating m-1 icone-sobre" 
            href="#!" 
            role="button"
          >
            <i className="bi bi-linkedin"></i>
          </Link>

          <Link 
            className="btn btn-outline-light btn-floating m-1 icone-sobre" 
            href="#!" 
            role="button"
          >
            <i className="bi bi-youtube"></i>
          </Link>
        </section>
        </div>
        <img 
          src="https://portalcultura.campinas.sp.gov.br/sites/portalcultura.campinas.sp.gov.br/files/noticias/orquestra_muda_lei.jpg" 
          alt="Sobre" 
          className="sobre__imagem"
        />
      </section>
    </div>
  );
};


export default QuemSomos;