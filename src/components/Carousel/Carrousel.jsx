import Carousel from "react-bootstrap/Carousel";
import imagen from "../../assets/lola-mora.jpg";
import "./carousel.css";

function Carrousel() {
  return (
    <Carousel>
      <Carousel.Item
        style={{ overflow: "hidden" }}
        className="contenedorImagenCar"
      >
        <img src={imagen} alt="" className="imagenCar" />
        <Carousel.Caption className="text-image ">
          {/* <h3>Patrimonio Municipal</h3>
          <p>En desarrollo... Vuelva prontos</p> */}
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item
        style={{ overflow: "hidden" }}
        className="contenedorImagenCar"
      >
        <img src={imagen} alt="" className="imagenCar" />
        <Carousel.Caption className="text-image">
          {/* <h3>Patrimonio Municipal :D</h3>
          <p>En desarrollo... Vuelva prontos</p> */}
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item
        style={{ overflow: "hidden" }}
        className="contenedorImagenCar"
      >
        <img src={imagen} alt="" className="imagenCar" />
        <Carousel.Caption className="text-image">
          {/* <h3>Patrimonio Municipal :D</h3>
          <p>En desarrollo... Vuelva prontos</p> */}
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default Carrousel;
