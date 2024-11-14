import NavBar from '../../common/NavBar';
import Card from '../MediaCard/MediaCardHome';
import Carrousel from "../Carousel/Carrousel";
import logoMuniHome from "../../assets/Logo_SMT_pos_1.png";
import './Home.css';

const Home = () => {
  const customStyles = {
    backgroundColor: 'white'  
  };

  return (
    <>
      <NavBar customStyles={customStyles} logoSrc={logoMuniHome} color={true} /> 
      <div className='' style={{height: "84.5dvh"}}>
        <Carrousel/>
        <div className="container my-5 text-center">
          <h1>Patrimonio Municipal</h1>
          <div className="patrimonio-svg-home">
            <svg
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              width="100%"
              height="30"
              fill="RoyalBLue"
            >
              <rect className="svg" width="100%" height="50" fill="RoyalBlue" />
            </svg>
          </div>
        </div>
        <div className="d-flex flex-wrap gap-5 justify-content-center pb-5">
          <Card/>
        </div>
      </div>
    </>
  );
}

export default Home;
