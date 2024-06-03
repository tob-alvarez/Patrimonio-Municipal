import * as React from 'react';
import { Card, CardContent, Typography, CardActionArea } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from '../../config/axios';

function ActionAreaCard({ patrimonio }) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    console.log(`Navigating to /patrimonio/${patrimonio.id}`);
    navigate(`/patrimonio/${patrimonio.id}`);
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

function Estatuas() {
  const [patrimonios, setPatrimonios] = React.useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get('/patrimonio/listarPatrimonios');
      console.log(':D', response.data);

      setPatrimonios(response.data.patrimonios);
    } catch (error) {
      console.error('Algo salió mal :(', error);
    }
  };
  
  React.useEffect(() => {
    

    fetchData();
  }, []);

  
  const filteredPatrimonios = patrimonios.filter(patrimonio => {
    console.log('Checking patrimonio:', patrimonio); 
    return patrimonio.id_tipologia === 2;
  });

  console.log('Filtered Patrimonios:', filteredPatrimonios);

  return (
    <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', marginTop: '50px', flexWrap: 'wrap' }}>
      {filteredPatrimonios.map(patrimonio => (
        <ActionAreaCard key={patrimonio.id_patrimonio} patrimonio={patrimonio} />
      ))}
    </div>
  );
}

export default Estatuas;
