import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import HomeSharpIcon from "@mui/icons-material/HomeSharp";
import ColorLensSharpIcon from "@mui/icons-material/ColorLensSharp";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";

const navbarStyles = {
  width: "100%",
  mb: 5,
  position: "sticky",
  top: 0,
  bgcolor: "#fff",
  zIndex: 2,
  '& .Mui-selected': {
    color: 'rgb(0, 114, 229)!important'
  },
  '& .MuiTab-labelIcon': {
    color: 'rgb(46 42 98)',
    fontWeight: 'bold'
  }
};

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation()
  const value = location.pathname === '/' ? 0 : 1

  return (
    <Box sx={navbarStyles}>
      <Tabs
        value={value}
        centered
      >
        <Tab
          icon={<HomeSharpIcon />}
          label="HOME"
          onClick={() => navigate("/")}
        />
        <Tab
          icon={<ColorLensSharpIcon />}
          label="COLORS"
          onClick={() => navigate("/colors")}
        />
      </Tabs>
      <Divider />
    </Box>
  );
};

export default Navbar;
