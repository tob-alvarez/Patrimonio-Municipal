import { useEffect, useState } from "react";
import axios from "../../config/axios";
import ActionAreaCard from "../ActionAreaCard/ActionAreaCard";

function Estatuas() {
  const [patrimonios, setPatrimonios] = useState([]);

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
    (patrimonio) => patrimonio.id_tipologia === 2
  );

  return (
    <div
      style={{
        display: "flex",
        gap: "20px",
        justifyContent: "center",
        marginTop: "50px",
        flexWrap: "wrap",
      }}
    >
      {filteredPatrimonios.map((patrimonio, index) => (
        <ActionAreaCard key={index} patrimonio={patrimonio} />
      ))}
    </div>
  );
}

export default Estatuas;
