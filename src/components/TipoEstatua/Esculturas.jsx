import { useEffect, useState } from "react";
import axios from "../../config/axios";
import ActionAreaCard from "../ActionAreaCard/ActionAreaCard";
import NavBar from "../../common/NavBar";
import logoMuniHome from "../../assets/Logo_SMT_pos_1.png"
import "./TipoEstatua.css"

function Esculturas() {
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

  const filteredPatrimonios = patrimonios.filter(
    (patrimonio) => patrimonio.id_tipologia === 1
  );

  return (
    <>
    <NavBar customStyles={customStyles} logoSrc={logoMuniHome}/>
    <div className="stylexd" >
      {filteredPatrimonios.map((patrimonio, index) => (
        <ActionAreaCard key={index} patrimonio={patrimonio} />
      ))}
    </div>
    </>
  );
}

export default Esculturas;
