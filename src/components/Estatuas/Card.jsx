import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../config/axios";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import "./Cards.css";

const MediaCards = () => {
  const [patrimonios, setPatrimonios] = useState([]);
  const navigate = useNavigate();

  const fetchImages = async () => {
    const url = `http://localhost:3000/patrimonio/listarPatrimonios/`;
    try { 
       const response = await axios.get(url);
      const data = response.data.patrimonios;
      // const responseImagenes = await axios.get('http://localhost:3000/admin/obtenerImagenes');
      // const images = await responseImagenes.json();
      // console.log(responseImagenes);
      const patrimoniosConImagen = await Promise.all(
        data.map(async (patrimonio) => {
          
          const imagenesResponse = await axios.get(
            `http://localhost:3000/admin/obtenerImagenesPatri?nombreArchivo=${patrimonio.nombre_archivo?.split('.')[0]}`
          );
          const primeraImagen = imagenesResponse.data[0]?.imagen; // Obtener la primera imagen
          return { ...patrimonio, primeraImagen };
        })
      );

      setPatrimonios(patrimoniosConImagen);
      // console.log(patrimoniosConImagen);
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
          <div
            className="cards-container"
            key={index}
            onClick={() => handleCardClick(patrimonio.id_patrimonio)}
          >
            <Card sx={{ maxWidth: 345 }}>
              <CardMedia
                component="img"
                alt={patrimonio.nombre_patrimonio}
                height="140"
                image={patrimonio.primeraImagen ? `data:image/jpeg;base64,${patrimonio.primeraImagen}` : ''}
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
