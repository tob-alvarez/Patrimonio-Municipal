// NavBar.jsx
import React, { useState, useEffect } from "react";
import { AppBar, Box, Toolbar, Menu, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import logoMuniLight from "../assets/Logo_SMT_neg_1.png";
import SideBar from "./SideBar";
import "./Navbar.css";

const NavBar = ({ customStyles, logoSrc, isInsideCard }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [bgColor, setBgColor] = useState(isInsideCard ? 'white' : 'transparent');
  const [currentLogoSrc, setCurrentLogoSrc] = useState(logoSrc || logoMuniLight);

  const navigate = useNavigate();

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    navigate("/");
    setAnchorEl(null);
  };

  useEffect(() => {
    // Update logoSrc if passed from props
    if (logoSrc) setCurrentLogoSrc(logoSrc);
  }, [logoSrc]);

  useEffect(() => {
    // Update background color based on isInsideCard prop
    setBgColor(isInsideCard ? 'white' : 'transparent');
  }, [isInsideCard]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" className="AppBar" style={{ backgroundColor: bgColor, ...customStyles }}>
        <Toolbar>
          <SideBar />
          <div className="d-flex justify-content-between align-items-center w-100">
            <img src={currentLogoSrc} className="logoMuni2" alt="Logo" />
            <div className="d-flex align-items-center">
              <Menu
                className="logOut"
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleLogout}>Cerrar Sesión</MenuItem>
              </Menu>
            </div>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;
