import React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import HomeSharpIcon from "@mui/icons-material/HomeSharp";
import ColorLensSharpIcon from "@mui/icons-material/ColorLensSharp";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";

const navbarStyles = {
    width: '100%',
    mb: 5,
    position: 'sticky',
    top: 0,
    bgcolor: '#fff',
    zIndex: 2
}

const Navbar = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={navbarStyles}
    >
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="icon label tabs example"
        centered
      >
        <Tab icon={<HomeSharpIcon />} label="HOME" />
        <Tab icon={<ColorLensSharpIcon />} label="COLORS" />
      </Tabs>
      <Divider />
    </Box>
  );
};

export default Navbar;
