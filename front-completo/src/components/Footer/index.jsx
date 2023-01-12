import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="text-center text-white teste">
      <div className="container p-4">
        <section className="mb-4 icone">
          <Link 
            className="btn btn-outline-light btn-floating m-1" to="#!" 
            role="button"
          >
            <i className="bi bi-facebook"></i>
          </Link>

          <Link 
            className="btn btn-outline-light btn-floating m-1" href="#!" 
            role="button"
          >
            <i className="bi bi-twitter"></i>
          </Link>

          <Link 
            className="btn btn-outline-light btn-floating m-1" href="#!" 
            role="button"
          >
            <i className="bi bi-google"></i>
          </Link>

          <Link 
            className="btn btn-outline-light btn-floating m-1" href="#!" 
            role="button"
          >
            <i className="bi bi-instagram"></i>
          </Link>

          <Link 
            className="btn btn-outline-light btn-floating m-1" href="#!" 
            role="button"
          >
            <i className="bi bi-linkedin"></i>
          </Link>

          <Link 
            className="btn btn-outline-light btn-floating m-1" href="#!" 
            role="button"
          >
            <i className="bi bi-youtube"></i>
          </Link>
        </section>

        <section className="mb-4">
          <p>
            "O homem que não tem a música dentro de si e que não se emociona com um concerto de doces acordes é capaz de traições,
            de conjuras e de rapinas." - William Shakespeare
          </p>
        </section>

        <div className="text-center p-3">
          <p>
            © 2022 SONG PLAY
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;