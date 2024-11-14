import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../config/axios";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import "./MediaCardHome.css";
import LoaderMuni from "../LoaderMuni/LoaderMuni";
import Muni from "../../assets/logoMuni-sm.png";

const MediaCard = ({ patri }) => {
  const [patrimonios, setPatrimonios] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const fetchImages = async () => {
    try {
      const archivosBuscados = patri.map(
        (patrimonio) => patrimonio.nombre_archivo?.split(".")[0]
      );

      const imagenesResponse = await axios.get("/admin/obtenerImagenCard", {
        params: { archivosBuscados },
      });

      const imagenes = imagenesResponse.data.imagenesEncontradas;

      // Asignar la primera imagen de cada patrimonio
      const patrimoniosConImagen = patri.map((patrimonio) => {
        const nombreArchivo = patrimonio.nombre_archivo?.split(".")[0];
        const primeraImagen = imagenes[nombreArchivo]?.[`${nombreArchivo}_card`];
        return { ...patrimonio, primeraImagen };
      });

      setPatrimonios(patrimoniosConImagen);
    } catch (error) {
      console.error("Error fetching the image URLs", error);
    } finally {
      setIsLoading(false);
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
      {isLoading ? (
        <LoaderMuni img={Muni} />
      ) : patrimonios.length > 0 ? (
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
                height="150"
                image={
                  patrimonio.primeraImagen
                    ? `data:image/jpeg;base64,${patrimonio.primeraImagen}`
                    : ""
                }
                style={{
                  objectFit: "cover",
                  objectPosition: "50% 20%",
                }}
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
        <Typography variant="h6" color="textSecondary" align="center">
          No existen patrimonios en esta categoría
        </Typography>
      )}
    </>
  );
};

export default MediaCard;
