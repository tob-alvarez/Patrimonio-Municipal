import { useEffect, useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import axios from "../../config/axios";
import "./Carousel.css";

function Carrousel() {
  const [banners, setBanners] = useState([]);

  const fetchBanners = async () => {
    try {
      const response1 = await axios.get("/admin/obtenerBanners");
      console.log("Respuesta de obtenerBanners:", response1);

      if (response1.data.length > 0) {
      
        const bannersArray = await Promise.all(
          response1.data.map(async (banner) => {
            const bannerName = encodeURIComponent(banner.nombre_banner);
            
            const response = await axios.get("/admin/imagenPreview", {
              params: { banner: bannerName },
            });
            console.log(response,"response");
            return {
              nombre: banner.nombre_banner,
              imagen: response.data.banner.base64Image
            };
          })
        );

        setBanners(bannersArray);
      } else {
        console.error("No se encontraron banners en la respuesta.");
      }
    } catch (error) {
      console.error("Error al obtener los banners:", error);
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  return (
    <Carousel>
      {banners.map((banner, index) => (
        <Carousel.Item key={index} style={{ overflow: "hidden" }} className="contenedorImagenCar">
          <img 
            src={`data:image/jpeg;base64,${banner.imagen}`} 
            alt={`Banner ${banner.nombre}`} 
            className="imagenCar" 
          />
          <Carousel.Caption className="text-image">
            {/* Aquí puedes agregar algún texto o título si lo deseas */}
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default Carrousel;
