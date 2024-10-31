import { useEffect, useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import axios from "../../config/axios";
import banner1 from "../../assets/estatua.jpg"
import "./carousel.css";

function Carrousel() {
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await axios.get("/admin/obtenerBanners");
        console.log(response, "a");
        // const bannersHabilitados = response.data.filter(banner => banner.habilita === 1);
        setBanners(response.data);
      } catch (error) {
        console.error("Error al obtener los banners:", error);
      }
    };
    
    fetchBanners();
  }, []);

  return (
    <Carousel>
      {banners?.map((banner, index) => (
        <Carousel.Item key={index} style={{ overflow: "hidden" }} className="contenedorImagenCar">
          <img src={`/var/www/vhosts/cidituc.smt.gob.ar/Fotos-Patrimonio/Banner/${banner.nombre_banner}`} alt="" className="imagenCar" />
          {/* <img src={banner1} alt="" className="imagenCar" /> */}
          {console.log(banner.nombre_banner, "banner")}
          <Carousel.Caption className="text-image">
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default Carrousel;
