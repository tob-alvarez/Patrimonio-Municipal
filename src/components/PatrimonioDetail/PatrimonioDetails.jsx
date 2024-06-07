import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../config/axios";
import "./PatrimonioDetails.css";
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';

function PatrimonioDetail() {
  const { id } = useParams();
  const [patrimonio, setPatrimonio] = useState(null);
  const [error, setError] = useState(null);
  const [imagenes, setImagenes] = useState([]);

  const traerPatrimonio = async (id) => {
    try {
      const response = await axios.get(`/patrimonio/listarPatrimoniosPorId/${id}`);
      const data = response.data.patrimonio[0];
      setPatrimonio(data);
      setImagenes([
        {
          original: `https://atencionciudadana.smt.gob.ar/Fotos-Patrimonio/${data.nombre_archivo}`,
          thumbnail: `https://atencionciudadana.smt.gob.ar/Fotos-Patrimonio/${data.nombre_archivo}`,
          
        },
        {
          original: "https://picsum.photos/id/1018/1000/600",
          thumbnail:"https://picsum.photos/id/1018/250/150"
        },
        {
          original: "https://picsum.photos/id/1015/1000/600",
          thumbnail:"https://picsum.photos/id/1015/250/150"
        },
        {
          original: "https://picsum.photos/id/1019/1000/600",
          thumbnail:"https://picsum.photos/id/1019/250/150"
        },

      ]);
    } catch (error) {
      console.error('No se encontró el patrimonio', error);
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

  return (
    <div className="patrimonio-container">
      <h1 className="patrimonio-title">{patrimonio.nombre_patrimonio}</h1>
      <div className="image-gallery">
        <ImageGallery items={imagenes} 
        showPlayButton={true} 
        showNav={false}
        autoPlay={true}
        slideInterval={3000}
                
        />
      </div>
      <p className="patrimonio-autor">Autor: {patrimonio.nombre_autor}</p>
      <p className="patrimonio-año">
        Año de emplazamiento: {patrimonio.anio_emplazamiento.slice(0, 10)}
      </p>
      <p className="patrimonio-ubicacion">Ubicación: {patrimonio.nombre_ubicacion}</p>
      <p className="patrimonio-origen">Origen del Patrimonio: {patrimonio.origen}</p>
      <p className="patrimonio-descripcion">{patrimonio.descripcion}</p>
    </div>
  );
}

export default PatrimonioDetail;