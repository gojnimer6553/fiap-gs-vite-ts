import Router from "preact-router";
import { routes } from "./constants";
import Map from "../../pages/map";
import Vehicle from "../../pages/vehicle";

const Routes = () => (
  <Router>
    <Map path={routes.default.path} />
    <Vehicle path={routes.vehicle.path} />
  </Router>
);

export default Routes;
