import "../common/Footer.css";
import logo from "../assets/Logo_SMT_neg_7.png";
import logoRedes from "../assets/logo-SMT-Blanco.png";

export const Footer = () => {
  return (
    <footer className="footerCont pt-4 pb-4">
      <div className="container-fluid text-center text-md-left">
        <div className="row pingo">
          <div className="d-flex col-md-4 mt-0 mb-2">
            <div className="logoFooter">
              <img src={logo} alt="logo municipalidad de Tucumán" />
            </div>
          </div>
          {/* <div className="col-md-6 col-12 mb-md-0 mb-3 mt-1"> */}
            <div className="d-flex me-2 col-md-6 mb-md-0 seguinos">
              <h5 className="pe-2 mb-0">Seguinos en </h5>
              <div className="iconosRedes">
                <a
                  className="p-2"
                  href="https://www.facebook.com/MuniSMTucuman/"
                  target="_blank"
                >
                  <i className="icono bi bi-facebook"></i>
                </a>
                <a
                  className="p-2"
                  href="https://www.instagram.com/munismtucuman/"
                  target="_blank"
                >
                  <i className="icono bi bi-instagram"></i>
                </a>
                <a
                  className="p-2"
                  href="https://twitter.com/muniSMT"
                  target="_blank"
                >
                  <i className="icono bi bi-twitter"></i>
                </a>
                <a
                  className="p-2"
                  href="https://www.youtube.com/munismtucuman"
                  target="_blank"
                >
                  <i className="icono bi bi-youtube"></i>
                </a>
                <a
                  className="p-2"
                  href="https://smt.gob.ar/"
                  target="_blank"
                >
                  <img
                    src={logoRedes}
                    className="logoRedesFooter"
                    alt="logo muni"
                  />
                </a>
              </div>
            </div>
            {/* <div className="pt-1">
              <p className="parrafo text-center text-md-end my-2 me-0 me-md-5">
                Municipalidad de San Miguel de Tucumán
              </p>
              <p className="parrafo text-center text-md-end my-2 me-0 me-md-5">
                9 de Julio 598, Tucumán. República Argentina
              </p>
              <p className="parrafo text-center text-md-end my-2 me-0 me-md-5">
                Desarrollado por DITEC© 2024
              </p>
              <p className="parrafo text-center text-md-end my-2 me-0 me-md-5">
                SECRETARIA DE INNOVACION TECNOLOGICA
              </p>
            </div> */}
          </div>
        </div>
      {/* </div> */}
    </footer>
  );
};

export default Footer;
