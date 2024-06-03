import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, CardActionArea } from '@mui/material';
import axios from '../../config/axios';
import { useNavigate } from 'react-router-dom';

// Componente de la tarjeta de acción
function ActionAreaCard({ patrimonio, onCardClick }) {
  const handleCardClick = () => {
    onCardClick(patrimonio.id_patrimonio); 
  };

  return (
    <Card sx={{ maxWidth: 350 }}>
      <CardActionArea onClick={handleCardClick}>
        <img className='img-fluid'
          src={`https://atencionciudadana.smt.gob.ar/Fotos-Patrimonio/${patrimonio.nombre_archivo}`}
          style={{ minWidth: "350px", maxWidth: "350px", minHeight: "200px", maxHeight: "200px", objectFit: "cover" }}
          alt={patrimonio.nombre_patrimonio}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {patrimonio.nombre_patrimonio}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {patrimonio.descripcion}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

// Componente principal de Esculturas
function Esculturas() {
  const [patrimonios, setPatrimonios] = useState([]);
  const navigate = useNavigate(); // Obtiene la función navigate

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/patrimonio/listarPatrimonios');
        console.log('Respuesta de la solicitud:', response.data);

        setPatrimonios(response.data.patrimonios);
      } catch (error) {
        console.error('Error al obtener patrimonios:', error);
      }
    };

    fetchData();
  }, []);

  // Filtra los patrimonios basados en id_tipologia
  const filteredPatrimonios = patrimonios.filter(patrimonio => patrimonio.id_tipologia === 1);

  // Función para manejar la navegación cuando se hace clic en una tarjeta
  const handleCardClick = (id) => {
    console.log(`Navegando a /patrimonio/${id}`);
    navigate(`/patrimonio/${id}`);
  };

  return (
    <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', marginTop: '50px', flexWrap: 'wrap' }}>
      {filteredPatrimonios.map(patrimonio => (
        <ActionAreaCard key={patrimonio.id_patrimonio} patrimonio={patrimonio} onCardClick={handleCardClick} />
      ))}
    </div>
  );
}

export default Esculturas;
