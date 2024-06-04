import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../../config/axios'

function PatrimonioDetail() {
  const { id } = useParams();
  const [patrimonio, setPatrimonio] = useState(null);
  const [error, setError] = useState(null);

  const traerPatrimonio = async (id) => {
    try {
      const response = await axios.get(`/patrimonio/listarPatrimoniosPorId/${id}`);
      setPatrimonio(response.data.patrimonio[0]);
    } catch (error) {
      console.error("No se encontró el patrimonio", error);
      throw new Error("No se encontró el patrimonio");
    }
  };

  useEffect(() => {
    traerPatrimonio(id);
  }, [id]);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!patrimonio) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      <h1>{patrimonio.nombre_patrimonio}</h1>
      <p>Año de emplazamiento: {patrimonio.anio_emplazamiento}</p>
      <img src={`https://atencionciudadana.smt.gob.ar/Fotos-Patrimonio/${patrimonio.nombre_archivo}`} alt={patrimonio.nombre_patrimonio} />
      <p>{patrimonio.descripcion}</p>
    </div>
  );
}

export default PatrimonioDetail;
