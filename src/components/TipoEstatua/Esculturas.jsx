import { useEffect, useState } from 'react';
import axios from '../../config/axios';
import ActionAreaCard from '../ActionAreaCard/ActionAreaCard';

// Componente principal de Esculturas
function Esculturas() {
  const [patrimonios, setPatrimonios] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get('/patrimonio/listarPatrimonios');
      setPatrimonios(response.data.patrimonios);
    } catch (error) {
      console.error('Error al obtener patrimonios:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Filtra los patrimonios basados en id_tipologia
  const filteredPatrimonios = patrimonios.filter(patrimonio => patrimonio.id_tipologia === 1);

  return (
    <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', marginTop: '50px', flexWrap: 'wrap' }}>
      {filteredPatrimonios.map((patrimonio, index) => (
        <ActionAreaCard key={index} patrimonio={patrimonio} />
      ))}
    </div>
  );
}

export default Esculturas;
