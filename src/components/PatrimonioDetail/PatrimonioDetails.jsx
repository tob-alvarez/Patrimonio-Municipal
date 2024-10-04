import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../config/axios";
import "./PatrimonioDetails.css";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { ParallaxProvider, ParallaxBanner } from "react-scroll-parallax";
import NavBar from "../../common/NavBar";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import LoaderMuni from "../LoaderMuni/LoaderMuni";
import Muni from "../../assets/logo-SMT-Blanco.png";

const containerStyle = {
  width: "100%",
  height: "400px",
};

function PatrimonioDetail() {
  const { id } = useParams();
  const [patrimonio, setPatrimonio] = useState(null);
  const [error, setError] = useState(null);
  const [imagenes, setImagenes] = useState([]);

  const back = import.meta.env.VITE_APP_RUTA_BACK;

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyAAZH-C5wlX8bcDecWgRAxpyaVLGWeGNOQ",
  });

  const traerPatrimonio = async (id) => {
    try {
      const response = await axios.get(
        `${back}/patrimonio/listarPatrimoniosPorId/${id}`
      );
      const data = response.data.patrimonio[0];

      if (!data) {
        throw new Error("No se encontró el patrimonio");
      }
      setPatrimonio(data);
      console.log("hola");
      console.log(data.nombre_archivo);

      // Llamar al backend para obtener imágenes existentes
      const imagenesExistentes = await axios.get(
        `${back}/admin/obtenerImagenesPatri?nombreArchivo=${
          data.nombre_archivo?.split(".")[0]
        }`
      );
      console.log(imagenesExistentes?.data[0], "xs<");

      // const imagenesArray = imagenesExistentes.data.map((imagen) => ({
      //   original: `http://localhost:3000/admin/obtenerImagenesPatri?nombreArchivo=${imagen}`,
      //   thumbnail: `http://localhost:3000/admin/obtenerImagenesPatri?nombreArchivo=${imagen}`,
      // }));

      setImagenes(imagenesExistentes.data);
    } catch (error) {
      console.error("No se encontró el patrimonio", error);
      setError(error);
    }
  };

  useEffect(() => {
    traerPatrimonio(id);
  }, [id]);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!patrimonio) {
    return <div>Cargando...</div>;
  }

  // Separar las coordenadas
  const [latitud, longitud] = patrimonio.latylon
    .split(",")
    .map((coord) => parseFloat(coord.trim()));

  return (
    <ParallaxProvider>
      <NavBar customStyles={{ boxShadow: "none" }} />
      {imagenes.length > 0 ? (
        <>
          <ParallaxBanner
            className="parallax"
            layers={[
              {
                image: `data:image/jpeg;base64,${
                  imagenes.length > 0 ? imagenes[0].imagen : ""
                }`,
                amount: 0.3,
              },
            ]}
            style={{
              height: "1000px",
            }}
          >
            <div className="patrimonio-background"></div>
          </ParallaxBanner>
          <div className="patrimonio-container">
            <h1 className="patrimonio-title">
              {patrimonio.nombre_patrimonio}
              <div className="patrimonio-svg">
                <svg version="1.1" xmlns="http://www.w3.org/2000/svg">
                  <rect
                    className="svg"
                    width="100%"
                    height="50"
                    fill="RoyalBlue"
                  />
                </svg>
              </div>
            </h1>
            <div className="patrimonio-content">
              <div className="image-gallery">
                <ImageGallery
                  items={imagenes.map((imagen) => ({
                    original: `data:image/jpeg;base64,${imagen.imagen}`,
                    thumbnail: `data:image/jpeg;base64,${imagen.imagen}`,
                  }))}
                  showPlayButton={true}
                  showNav={true}
                  autoPlay={true}
                  slideInterval={3000}
                  showFullscreenButton={true}
                  thumbnailPosition="top"
                />
              </div>
              <div className="patrimonio-info">
                <p className="patrimonio-autor">
                  🔵 Autor: {patrimonio.nombre_autor}
                </p>
                <p className="patrimonio-año">
                  🔵 Año de emplazamiento:{" "}
                  {typeof patrimonio.anio_emplazamiento === "string"
                    ? patrimonio.anio_emplazamiento.slice(0, 10)
                    : ""}
                </p>
                <p className="patrimonio-ubicacion">
                  🔵 Ubicación: {patrimonio.nombre_ubicacion}
                </p>
                <p className="patrimonio-origen">
                  🔵 Origen del Patrimonio: {patrimonio.origen}
                </p>
                <p className="patrimonio-descripcion">
                  {patrimonio.descripcion}
                </p>
              </div>
            </div>

            <h3 className="mt-5">Geolocalización</h3>
            <div className="patrimonio-svg-h3">
              <svg version="1.1" xmlns="http://www.w3.org/2000/svg">
                <rect
                  className="svg"
                  width="100%"
                  height="50"
                  fill="RoyalBlue"
                />
              </svg>
            </div>

            {isLoaded && (
              <div id="map" className="map-container">
                <GoogleMap
                  mapContainerStyle={containerStyle}
                  center={{ lat: latitud, lng: longitud }}
                  zoom={20}
                >
                  <Marker
                    position={{ lat: latitud, lng: longitud }}
                    title="Ubicación del Patrimonio"
                  />
                </GoogleMap>
              </div>
            )}
          </div>{" "}
        </>
      ) : (
        <LoaderMuni img={Muni} />
      )}
    </ParallaxProvider>
  );
}

export default PatrimonioDetail;
