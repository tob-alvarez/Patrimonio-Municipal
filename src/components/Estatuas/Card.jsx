import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../config/axios";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import './Cards.css';

const MediaCards = () => {
  const [patrimonios, setPatrimonios] = useState([]);
  const navigate = useNavigate();

  const fetchImages = async () => {
    const url = `http://localhost:3000/patrimonio/listarPatrimonios/`;
    try {
      const response = await axios.get(url);
      const data = response.data.patrimonios;
      setPatrimonios(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching the image URLs", error);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const handleCardClick = (patrimonioId) => {
    navigate(`/patrimonio/${patrimonioId}`);
  };

  return (
    <>
      {patrimonios.length > 0 ? (
        patrimonios.map((patrimonio, index) => (
          <div className="cards-container" key={index} onClick={() => handleCardClick(patrimonio.id_patrimonio)}>
            <Card sx={{ maxWidth: 345 }}>
              <CardMedia
                component="img"
                alt={patrimonio.nombre_patrimonio}
                height="140"
                image={`https://atencionciudadana.smt.gob.ar/Fotos-Patrimonio/${patrimonio.nombre_archivo}`}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {patrimonio.nombre_patrimonio}
                </Typography>
              </CardContent>
            </Card>
          </div>
        ))
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

export default MediaCards;
