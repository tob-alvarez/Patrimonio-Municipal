import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../config/axios";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import "./Cards.css";
import LoaderMuni from "../LoaderMuni/LoaderMuni";
import Muni from "../../assets/logoMuni-sm.png";

const MediaCards = () => {
  const [patrimonios, setPatrimonios] = useState([]);
  const navigate = useNavigate();

  const back = import.meta.env.VITE_APP_RUTA_BACK;

  const fetchImages = async () => {
    const url = `${back}/patrimonio/listarPatrimonios/`;
    try {
      const response = await axios.get(url);
      const data = response.data.patrimonios;

      const archivosBuscados = data.map(
        (patrimonio) => patrimonio.nombre_archivo?.split(".")[0]
      );

      const imagenesResponse = await axios.get(
        `${back}/admin/obtenerImagenCard`,
        {
          params: { archivosBuscados },
        }
      );

      const imagenes = imagenesResponse.data.imagenesEncontradas;

      const patrimoniosConImagen = data.map((patrimonio) => {
        const nombreArchivo = patrimonio.nombre_archivo?.split(".")[0];
        const primeraImagen =
          imagenes[nombreArchivo]?.[`${nombreArchivo}_card`]; 
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
                image={`data:image;base64,${patrimonio.primeraImagen}`}
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
        <LoaderMuni img={Muni} />
      )}
    </>
  );
};

export default MediaCards;
