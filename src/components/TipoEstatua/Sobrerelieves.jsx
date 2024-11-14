import { useEffect, useState } from "react";
import axios from "../../config/axios";
import NavBar from "../../common/NavBar";
import logoMuniHome from "../../assets/Logo_SMT_pos_1.png"
import "./TipoEstatua.css"
import MediaCard from "../MediaCard/MediaCard";

function Sobrerelieves() {
  const [patrimonios, setPatrimonios] = useState([]);
  
    const customStyles = {
      backgroundColor: 'white'  
    };
  
  const fetchData = async () => {
    try {
      const response = await axios.get("/patrimonio/listarPatrimonios");
      setPatrimonios(response.data.patrimonios);
    } catch (error) {
      console.error("Error al obtener patrimonios:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // const filteredPatrimonios = patrimonios.filter(
  //   (patrimonio) => patrimonio.id_tipologia === 4
  // );

  return (
    <>
      <NavBar customStyles={customStyles} logoSrc={logoMuniHome} />
      <div className="stylexd">
        {patrimonios.length > 0 && (
          <MediaCard
            patri={patrimonios.filter(
              (patrimonio) => patrimonio.id_tipologia == 4
            )}
          />
        )}
      </div>
    </>
  );
}

export default Sobrerelieves;
