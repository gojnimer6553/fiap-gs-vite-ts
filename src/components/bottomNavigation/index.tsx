import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import { AiFillCar } from "react-icons/ai";
import { FaMapLocation } from "react-icons/fa6";
import { useState } from "preact/hooks";
import { IconContext } from "react-icons";
import { route, getCurrentUrl } from "preact-router";
import { routes } from "../routes/constants";

export default function SimpleBottomNavigation() {
  const [value, setValue] = useState(+(getCurrentUrl() === "/vehicle"));

  return (
    <IconContext.Provider
      value={{ size: "2.5em", className: "global-class-name" }}
    >
      <Box
        sx={{ position: "fixed", bottom: 0, width: "-webkit-fill-available" }}
      >
        <BottomNavigation
          showLabels
          value={value}
          onChange={(_event, newValue) => {
            setValue(newValue);
            //Melhorar lógica futuramente
            route(newValue ? routes.vehicle.path : routes.default.path);
          }}
        >
          <BottomNavigationAction label="Mapa" icon={<FaMapLocation />} />
          <BottomNavigationAction label="Carros" icon={<AiFillCar />} />
        </BottomNavigation>
      </Box>
    </IconContext.Provider>
  );
}
