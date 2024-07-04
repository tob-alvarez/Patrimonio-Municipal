import * as React from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import MenuIcon from "@mui/icons-material/Menu";
import {
  IconButton,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import "./SideBar.css";
import { EducaContext } from "../Context/EducaContext";
import { useContext, useEffect, useState } from "react";
import CircleIcon from "@mui/icons-material/Circle";

export default function ListaPrueba() {
  const [state, setState] = React.useState({
    left: false,
  });

  const navigate = useNavigate();
  const { tipologias, obtenerTipologias } = useContext(EducaContext);

  const toggleDrawer = (open) => {
    setState({ left: open });
  };

  const redirigir = (ruta) => {
    navigate(ruta);
    setState(false);
  };

  useEffect(() => {
    obtenerTipologias();
  }, []);

  const list = () => (
    <Box
      sx={{ width: 220 }}
      role="presentation"
      className="d-flex justify-content-between flex-column h-100"
    >
      <div className="d-flex flex-column justify-content-center align-items-center mt-5 ">
        {/* INICIO */}
        <ListItemButton
          onClick={() => redirigir("/home")}
          component="a"
          className="w-100"
        >
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Inicio" />
        </ListItemButton>
        {/* FIN INICIO */}

        {tipologias.map((item, index) => {
          let nuevoNombre;

          switch (item.id_tipologia) {
            case 1:
              nuevoNombre = "Esculturas";
              break;
            case 2:
              nuevoNombre = "Estatuas";
              break;
            case 3:
              nuevoNombre = "Bustos";
              break;
            case 4:
              nuevoNombre = "Sobrerelieves";
              break;
            case 5:
              nuevoNombre = "Bajorelieves";
              break;
            case 6:
              nuevoNombre = "Pinturas";
              break;
            case 7:
              nuevoNombre = "Museos";
              break;
            default:
              nuevoNombre = item.nombre_tipologia;
          }

          // Construir la ruta de redirección para cada tipo de tipología
          const ruta = `/${nuevoNombre}`;

          return (
            <div
              key={index}
              className="d-flex justify-content-between w-100 flex-column"
            >
              {/* Elemento del menú */}
              <ListItemButton onClick={() => redirigir(ruta)}>
                <ListItemIcon>
                  <CircleIcon sx={{ fontSize: 15 }} />
                </ListItemIcon>
                <ListItemText primary={nuevoNombre} />
              </ListItemButton>
            </div>
          );
        })}

        {/* ESTATUAS */}
        {/* <ListItemButton
            onClick={() => redirigir("/autoridades")}
            component="a"
            className="w-100"
            >
            <ListItemIcon>
              <GroupsIcon/>
            </ListItemIcon>
            <ListItemText primary="Autoridades" />
          </ListItemButton> */}
        {/* FIN AUTORIDADES */}
      </div>
      <div className="d-flex flex-column justify-content-center align-items-center">
        <p className="footer text-center">
          Desarrollado por Dirección de Innovación Tecnológica
          <span style={{ fontSize: "1.4em", verticalAlign: "-0.1em" }}>
            ©
          </span>{" "}
          2024
        </p>
      </div>
    </Box>
  );

  return (
    <div>
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="open drawer"
        sx={{ mr: 2 }}
        onClick={() => toggleDrawer(true)}
      >
        <MenuIcon />
      </IconButton>
      <SwipeableDrawer
        anchor="left"
        open={state.left}
        onClose={() => toggleDrawer(false)}
        onOpen={() => toggleDrawer(true)}
      >
        {list()}
      </SwipeableDrawer>
    </div>
  );
}
