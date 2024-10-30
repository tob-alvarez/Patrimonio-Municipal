import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../config/axios";
import "./PatrimonioDetails.css";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { ParallaxProvider, ParallaxBanner } from "react-scroll-parallax";
import NavBar from "../../common/NavBar";
import LoaderMuni from "../LoaderMuni/LoaderMuni";
import logoMuniLight from "../../assets/Logo_SMT_neg_1.png";
import logoMuniDark from "../../assets/Logo_SMT_pos_1.png";
import Muni from "../../assets/logoMuni-sm.png";
import { MapContainer, TileLayer, Marker, Popup, ZoomControl, useMap} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./Leaflet.css"
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// Configuración del icono de marcador
const icon = new L.Icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

function CenterMapButton({ lat, lng }) {
  const map = useMap();

  // Añadir el botón de control personalizado
  useEffect(() => {
    const centerMap = () => {
      map.setView([lat, lng], 20);
    };
    const centerButton = L.control({ position: "bottomright" });
    centerButton.onAdd = () => {
      const button = L.DomUtil.create("button", "center-map-button");
      button.innerHTML = "📍"; // Puedes cambiar este emoji por un ícono similar al de Google Maps
      button.onclick = centerMap;
      button.title = "Centrar";
      return button;
    };
    centerButton.addTo(map);

    return () => {
      map.removeControl(centerButton);
    };
  }, [map, lat, lng]);

  return null;
}

function PatrimonioDetail() {
  const { id } = useParams();
  const [patrimonio, setPatrimonio] = useState(null);
  const [error, setError] = useState(null);
  const [imagenes, setImagenes] = useState([]);

  // Estado para manejar el color de fondo y logo dinámicos
  const [bgColor, setBgColor] = useState("transparent");
  const [currentLogoSrc, setCurrentLogoSrc] = useState(logoMuniLight);

  const back = import.meta.env.VITE_APP_RUTA_BACK;

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

      const imagenesExistentes = await axios.get(
        `${back}/admin/obtenerImagenesPatri?nombreArchivo=${data.nombre_archivo?.split(".")[0]}`
      );
      setImagenes(imagenesExistentes.data);
    } catch (error) {
      console.error("No se encontró el patrimonio", error);
      setError(error);
    }
  };

  useEffect(() => {
    traerPatrimonio(id);
  }, [id]);

  // Función de scroll para cambiar color de fondo y logo
  const handleScroll = () => {
    if (window.scrollY > 0) {
      setBgColor("white");
      setCurrentLogoSrc(logoMuniDark);
    } else {
      setBgColor("transparent");
      setCurrentLogoSrc(logoMuniLight);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!patrimonio) {
    return <div>Cargando...</div>;
  }

  const [latitud, longitud] = patrimonio.latylon
    .split(",")
    .map((coord) => parseFloat(coord.trim()));

  const interactionOptions = {
    ZoomControl: true,
    doubleClickZoom: true,
    closePopupOnClick: true,
    dragging: true,
    zoomSnap: true,
    zoomDelta: true,
    trackResize: true,
    touchZoom: true,
    scrollWheelZoom: true,   
  }

  return (
    <ParallaxProvider>
      <NavBar 
        customStyles={{ boxShadow: "none", backgroundColor: bgColor }} 
        logoSrc={currentLogoSrc} 
      />
      {imagenes.length > 0 ? (
        <>
          <ParallaxBanner
            className="parallax"
            layers={[
              {
                image: `data:image/jpeg;base64,${imagenes.length > 0 ? imagenes[0].imagen : ""}`,
                amount: 0.3,
              },
            ]}
            style={{ height: "1000px" }}
          >
            <div className="patrimonio-background"></div>
          </ParallaxBanner>
          <div className="patrimonio-container">
            <h1 className="patrimonio-title">{patrimonio.nombre_patrimonio}</h1>
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
                <p className="patrimonio-autor">🔵 Autor: {patrimonio.nombre_autor}</p>
                <p className="patrimonio-año">🔵 Año de emplazamiento: {patrimonio.anio_emplazamiento.slice(0, 10)}</p>
                <p className="patrimonio-ubicacion">🔵 Ubicación: {patrimonio.nombre_ubicacion}</p>
                <p className="patrimonio-origen">🔵 Origen del Patrimonio: {patrimonio.origen}</p>
                <p className="patrimonio-descripcion">{patrimonio.descripcion}</p>
              </div>
            </div>

            <h3 className="mt-5">Geolocalización</h3>

            <div id="map" className="map-container">
              <MapContainer
                center={[latitud, longitud]}
                zoom={20}
                style={{ width: "100%", height: "400px" }}
                {...interactionOptions}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker position={[latitud, longitud]} icon={icon} {...interactionOptions}>
                  <Popup>{patrimonio.nombre_patrimonio}</Popup>
                </Marker>
                <CenterMapButton className="center-map-button" lat={latitud} lng={longitud} />
              </MapContainer>
            </div>
          </div>
        </>
      ) : (
        <LoaderMuni img={Muni} />
      )}
    </ParallaxProvider>
  );
}

export default PatrimonioDetail;
