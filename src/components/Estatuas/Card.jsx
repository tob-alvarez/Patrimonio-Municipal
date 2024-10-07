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

const MediaCards = ({ patri }) => {
  const [patrimonios, setPatrimonios] = useState([]);
  const [loading, setLoading] = useState([]);
  const navigate = useNavigate();

  const back = import.meta.env.VITE_APP_RUTA_BACK;
  // console.log(patri, "patri");
  const fetchImages = async () => {
    setLoading(true);

    let data;
    let archivosBuscados;

    try {
      if (patri === undefined) {
        const url = `${back}/patrimonio/listarPatrimonios/`;
        const response = await axios.get(url);
        data = response.data.patrimonios;

        archivosBuscados = data.map(
          (patrimonio) => patrimonio.nombre_archivo?.split(".")[0]
        );

        const imagenesResponse = await axios.get(
          `${back}/admin/obtenerImagenCard`,
          { params: { archivosBuscados } }
        );

        const imagenes = imagenesResponse.data.imagenesEncontradas;

        const patrimoniosConImagen = data.map((patrimonio) => {
          const nombreArchivo = patrimonio.nombre_archivo?.split(".")[0];
          const primeraImagen =
            imagenes[nombreArchivo]?.[`${nombreArchivo}_card`];
          return { ...patrimonio, primeraImagen };
        });
        setPatrimonios(patrimoniosConImagen);
      } else {
        if (patri.length > 0) {
          archivosBuscados = patri.map(
            (item) => item.nombre_patrimonio?.split(".")[0]
          );

          const imagenesResponse = await axios.get(
            `${back}/admin/obtenerImagenCard`,
            { params: { archivosBuscados } }
          );

          const imagenes = imagenesResponse.data.imagenesEncontradas;

          const patrimoniosConImagen = patri.map((item) => {
            const nombrePatrimonio = item.nombre_patrimonio?.split(".")[0];
            const primeraImagen =
              imagenes[nombrePatrimonio]?.[`${nombrePatrimonio}_card`];
            return { ...item, primeraImagen };
          });

          setPatrimonios(patrimoniosConImagen);
        } else {
          console.error("patri está vacío");
        }
      }
    } catch (error) {
      console.error("Error fetching the image URLs", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, [patri]);

  const handleCardClick = (patrimonioId) => {
    navigate(`/patrimonio/${patrimonioId}`);
  };

  return (
    <>
      {loading ? (
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
        <p>No se encontraron patrimonios.</p>
      )}
    </>
  );
};

export default MediaCards;
