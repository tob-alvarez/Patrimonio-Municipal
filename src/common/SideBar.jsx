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
// import GroupsIcon from '@mui/icons-material/Groups';
import "./SideBar.css";


export default function ListaPrueba() {
  const [state, setState] = React.useState({
    left: false,
  });

  const navigate = useNavigate();

  const redirigir = (ruta) => {
    navigate(ruta);
    setState(false)
  };


  const toggleDrawer = (open)  => {
    setState({ left: open });
  };

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
          <span style={{ fontSize: "1.4em", verticalAlign: "-0.1em" }}>©</span>{" "}
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
        onClick={()=>toggleDrawer(true)}
      >
        <MenuIcon />
      </IconButton>
      <SwipeableDrawer
        anchor="left"
        open={state.left}
        onClose={()=>toggleDrawer(false)}
        onOpen={()=>toggleDrawer(true)}
      >
        {list()}
      </SwipeableDrawer>
    </div>
  );
}
