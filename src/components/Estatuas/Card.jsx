import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../config/axios";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import "./Cards.css";
import LoaderMuni from "../LoaderMuni/LoaderMuni";
import Muni from "../../assets/logoMuni-sm.png"

const MediaCards = () => {
  const [patrimonios, setPatrimonios] = useState([]);
  const navigate = useNavigate();
 
  const fetchImages = async () => {
    const url = `http://localhost:3050/patrimonio/listarPatrimonios/`;
    try {
      const response = await axios.get(url);
      const data = response.data.patrimonios;

      const archivosBuscados = data.map(
        (patrimonio) => patrimonio.nombre_archivo?.split(".")[0]
      );

      // Hacer una única solicitud con todos los nombres de archivos
      const imagenesResponse = await axios.get(
        "http://localhost:3050/admin/obtenerImagenCard",
        {
          params: { archivosBuscados },
        }
      );
      

      const imagenes = imagenesResponse.data.imagenesEncontradas;
      {
        console.log(imagenes);
      }
      // Asignar la primera imagen de cada patrimonio
      const patrimoniosConImagen = data.map((patrimonio) => {
        const nombreArchivo = patrimonio.nombre_archivo?.split(".")[0];
        const primeraImagen =
          imagenes[nombreArchivo]?.[`${nombreArchivo}_card`]; // Obtener la primera imagen
        return { ...patrimonio, primeraImagen };
      });

      setPatrimonios(patrimoniosConImagen);
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
                image={
                  patrimonio.primeraImagen
                    ? `data:image/jpeg;base64,${patrimonio.primeraImagen}`
                    : ""
                }
              />
           
              <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                  {patrimonio.nombre_patrimonio}
                </Typography>
              </CardContent>
            </Card>
          </div>
        ))
      ) : (
       <LoaderMuni img = {Muni}/>
      )}
    </>
  );
};

export default MediaCards;
