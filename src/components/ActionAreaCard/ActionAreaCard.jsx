/* eslint-disable react/prop-types */
import { Card, CardActionArea, CardContent, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function ActionAreaCard({ patrimonio }) {
    const navigate = useNavigate()
    // Función para manejar la navegación cuando se hace clic en una tarjeta
    const handleCardClick = (id) => {
        navigate(`/patrimonio/${id}`);
    };

    return (
        <Card sx={{ maxWidth: 350 }}>
            <CardActionArea onClick={()=> handleCardClick(patrimonio.id_patrimonio)}>
                <img
                    className='img-fluid'
                    src={`http://localhost:3050/admin/obtenerImagenes?image=${patrimonio.nombre_archivo}`}
                    style={{ minWidth: "350px", maxWidth: "350px", minHeight: "200px", maxHeight: "200px", objectFit: "cover" }}
                    alt={patrimonio.nombre_patrimonio}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {patrimonio.nombre_patrimonio}
                    </Typography>
                    {/* <Typography variant="body2" color="text.secondary">
                        {patrimonio.descripcion}
                    </Typography> */}
                </CardContent>
            </CardActionArea>
        </Card>
    );
}

export default ActionAreaCard;
