import "../common/Footer.css"
import logo from "../assets/Logo_SMT_neg_1.png";
import logoRedes from "../assets/Logo_SMT_neg_4.png";

export const Footer = () => {
  return (
    <footer className="footerCont pt-4 pb-4">
      <div className="container-fluid text-center text-md-left ">
        <div className="row">
          <div className="d-flex justify-content-center col-md-6 mt-md-0 mt-3 mb-2">
            <div className=" logoFooter">
              <img src={logo} alt="logo municipalidad de Tucumán" />
            </div>
          </div>
          <div className="col-md-6 mb-md-0 mb-3  ">
            <div className="d-flex mt-3 me-5 seguinos ">
              <h5 className="pe-2 mb-0  ">Seguinos en </h5>
              <div className="iconosRedes">
                <a
                  className="p-2"
                  href="https://www.facebook.com/MuniSMTucuman/"
                >
                  <i className=" icono bi bi-facebook"></i>
                </a>
                <a
                  className="p-2"
                  href="https://www.instagram.com/munismtucuman/"
                >
                  <i className=" icono bi bi-instagram"></i>
                </a>
                <a className="p-2" href="https://twitter.com/muniSMT">
                  <i className=" icono bi bi-twitter"></i>
                </a>
                <a className="p-2" href="https://www.youtube.com/munismtucuman">
                  <i className=" icono bi bi-youtube"></i>
                </a>
                <a className="p-2" href="https://smt.gob.ar/">
                  <img
                    src={logoRedes}
                    className="logoRedesFooter"
                    alt="logo muni"
                  />
                </a>
              </div>
            </div>
            <div className="pt-1 ">
              <p className=" parrafo text-center text-md-end my-2 me-0 me-md-5  ">
                Municipalidad de San Miguel de Tucumán
              </p>
              <p className=" parrafo text-center text-md-end my-2 me-0  me-md-5 ">
                9 de Julio 598, Tucumán. República Argentina
              </p>
              <p className=" parrafo text-center text-md-end my-2 me-0 me-md-5">
                Desarrollado por DITEC© 2024
              </p>
              <p className="parrafo text-center text-md-end my-2 me-0 me-md-5">
              SECRETARIA DE INNOVACION TECNOLOGICA
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;