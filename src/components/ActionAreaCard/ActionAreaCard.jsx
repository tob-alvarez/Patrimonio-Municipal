/* eslint-disable react/prop-types */
import { Card, CardActionArea, CardContent, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../config/axios";

function ActionAreaCard({ patrimonio }) {
  const [patrimonioConImg, setPatrimonioConImg] = useState(null); // Inicializa como null
  const navigate = useNavigate();
  
  const back = import.meta.env.VITE_APP_RUTA_BACK;

  // Función para manejar la navegación cuando se hace clic en una tarjeta
  const handleCardClick = (id) => {
    navigate(`/patrimonio/${id}`);
  };

  // Función para obtener las imágenes
  const fetchImages = async () => {
    try {
      const archivosBuscados = patrimonio.nombre_patrimonio;
      console.log(archivosBuscados,"archivos buscados")
      const imagenesResponse = await axios.get(
        `${back}/admin/obtenerImagenCard`,
        {
          params: { archivosBuscados },
        }
      );

      const imagenes = imagenesResponse.data.imagenesEncontradas;

      // Encuentra la primera imagen correspondiente al patrimonio
      const nombreArchivo = patrimonio.nombre_patrimonio?.split(".")[0];
      const primeraImagen =
        imagenes?.[nombreArchivo]?.[`${nombreArchivo}_card`];
      console.log(imagenesResponse, "primeraImagen");
      setPatrimonioConImg(primeraImagen); // Actualiza solo la imagen correspondiente
    } catch (error) {
      console.error("Error fetching the image URLs", error);
    }
  };

  // Solo se ejecuta una vez cuando se monta el componente
  useEffect(() => {
    fetchImages();
  }, []); // No dependencias para evitar bucles infinitos

  return (
    <Card sx={{ maxWidth: 350 }}>
      <CardActionArea onClick={() => handleCardClick(patrimonio.id_patrimonio)}>
        <img
          className="img-fluid"
          src={patrimonioConImg || "fallback_image_url"} // Imagen de fallback en caso de error o que no exista
          style={{
            minWidth: "350px",
            maxWidth: "350px",
            minHeight: "200px",
            maxHeight: "200px",
            objectFit: "cover",
          }}
          alt={patrimonio.nombre_patrimonio}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {patrimonio.nombre_patrimonio}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default ActionAreaCard;
