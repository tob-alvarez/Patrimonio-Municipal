// import React from 'react';
// import { Card, CardActionArea, CardContent, Typography } from '@mui/material';

// function ActionAreaCard({ patrimonio, onCardClick }) {
//   const handleCardClick = () => {
//     onCardClick(patrimonio.id);
//   };

//   return (
//     <Card sx={{ maxWidth: 350 }}>
//       <CardActionArea onClick={handleCardClick}>
//         <img
//           className='img-fluid'
//           src={`https://atencionciudadana.smt.gob.ar/Fotos-Patrimonio/${patrimonio.nombre_archivo}`}
//           style={{ minWidth: "350px", maxWidth: "350px", minHeight: "200px", maxHeight: "200px", objectFit: "cover" }}
//           alt={patrimonio.nombre_patrimonio}
//         />
//         <CardContent>
//           <Typography gutterBottom variant="h5" component="div">
//             {patrimonio.nombre_patrimonio}
//           </Typography>
//           <Typography variant="body2" color="text.secondary">
//             {patrimonio.descripcion}
//           </Typography>
//         </CardContent>
//       </CardActionArea>
//     </Card>
//   );
// }

// export default ActionAreaCard;
