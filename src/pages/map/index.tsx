import { FunctionComponent } from "preact";
import { Map } from "pigeon-maps";
import { osm } from "pigeon-maps/providers";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import {
  Alert,
  AlertTitle,
  Card,
  CardHeader,
  List,
  ListSubheader,
} from "@mui/material";

const mockCorridas = [
  {
    origin: "Casa",
    destination: "Trabalho",
    date: "14 de Fevereiro, 2023",
  },
  {
    origin: "Trabalho",
    destination: "Casa",
    date: "14 de Fevereiro, 2023",
  },
  {
    origin: "Casa",
    destination: "Mercado",
    date: "19 de Fevereiro, 2023",
  },
  {
    origin: "Casa",
    destination: "Shopping",
    date: "12 de Março, 2023",
  },
  {
    origin: "Casa",
    destination: "Trabalho",
    date: "24 de Junho, 2023",
  },
];
const MainQueue: FunctionComponent = () => {
  const { height } = useWindowDimensions();

  return (
    <Grid2 container>
      <Grid2 sm={3} padding={1}>
        <Grid2 container height={height - 40}>
          <List
            sx={{ width: "100%", bgcolor: "background.paper" }}
            subheader={<ListSubheader>Últimas corridas</ListSubheader>}
          >
            {mockCorridas.map(({ destination, date }, index) => (
              <Card>
                <CardHeader
                  key={`${index}-historic-item`}
                  title={destination}
                  subheader={date}
                />
              </Card>
            ))}
          </List>
        </Grid2>
      </Grid2>
      <Grid2 sm={9}>
        <Grid2 container direction={"column"}>
          <Grid2 sm={1}>
            <Alert severity="warning">
              <AlertTitle>Em desenvolvimento</AlertTitle>O mapa de corridas
              ainda se encontra em desenvolvimento, está é uma{" "}
              <strong>demonstração</strong>
            </Alert>
          </Grid2>
          <Grid2 sm={11}>
            <Map
              provider={osm}
              height={height - 80}
              defaultCenter={[-23.586406, -46.543667]}
              defaultZoom={12}
              mouseEvents={false}
              touchEvents={false}
            />
          </Grid2>
        </Grid2>
      </Grid2>
    </Grid2>
  );
};

export default MainQueue;
