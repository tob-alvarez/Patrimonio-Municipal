import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function PatrimonioDetail() {
  const { id } = useParams();
  const [patrimonio, setPatrimonio] = useState(null);
  const [error, setError] = useState(null);

  const fetchPatrimonio = async (id) => {
    try {
        console.log(id)
      const response = await axios.get(`/patrimonio/listarPatrimonioPorId/${id}`);
      console.log('Datos del patrimonio:', response.data); 
      if (response.data && response.data.patrimonios && response.data.patrimonios.length > 0) {
        setPatrimonio(response.data.patrimonios[0]);
      } else {
        // No se encontraron datos de patrimonio
        setError({ message: 'No se encontraron datos de patrimonio' });
      }
    } catch (error) {
      console.error('Error al obtener los detalles del patrimonio:', error);
      setError(error);
    }
  };

  useEffect(() => {
    
      

    fetchPatrimonio();
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
