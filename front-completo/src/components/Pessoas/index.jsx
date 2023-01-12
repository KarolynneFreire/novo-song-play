import React from "react";

const Pessoas = () => {
  return (
      <div>
     <section className="quem-somos">
                <h3 className="quem-somos__titulo">Quem somos</h3>
                <p className="quem-somos__descricao">Conheça a comunidade por trás da iniciativa</p>
                <div className="pessoas">
                    <div className="pessoa">
                        <div className="pessoa__imagem pessoa__imagem--elionai"></div>
                        <span className="pessoa__nome">Elioenai</span>
                        <span className="pessoa__funcao">Back-End</span>
                    </div>
                    <div className="pessoa">
                        <div className="pessoa__imagem pessoa__imagem--karolynne"></div>
                        <span className="pessoa__nome">Karolynne</span>
                        <span className="pessoa__funcao">Front-End</span>
                    </div>
                    <div className="pessoa">
                        <div className="pessoa__imagem pessoa__imagem--lucas"></div>
                        <span className="pessoa__nome">Lucas</span>
                        <span className="pessoa__funcao">Front-End</span>
                    </div>
                    <div className="pessoa">
                        <div className="pessoa__imagem pessoa__imagem--marcos"></div>
                        <span className="pessoa__nome">Marcos</span>
                        <span className="pessoa__funcao">Back-End</span>
                    </div>
                </div>
        </section>

    </div>
  );
};


export default Pessoas;