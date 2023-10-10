import { FunctionComponent } from "preact";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import {
  Box,
  Button,
  ButtonGroup,
  List,
  ListItem,
  ListItemText,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { useCallback, useEffect, useReducer } from "preact/hooks";
import { LocalStorageVehicles } from "../../utils/localstorage";

interface IVehicle {
  color: string;
  brand: string;
  plate: string;
}

const defaultValues = {
  isEditing: false,
  color: "",
  plate: "",
  brand: "",
};

const Vehicle: FunctionComponent = () => {
  const [vehicles, dispatch] = useReducer(
    (
      state,
      action:
        | { type: "ADD" | "EDIT"; payload: IVehicle }
        | { type: "DELETE"; payload: { index: number } }
    ) => {
      switch (action.type) {
        case "ADD":
          if (
            state.find(
              (vehicle) =>
                vehicle.plate.toLowerCase().trim() ===
                action.payload.plate.toLowerCase().trim()
            )
          ) {
            alert("Veículo já cadastrado");
            return state;
          }
          const newVehiclesList = [...state, action.payload];
          LocalStorageVehicles.saveVehicles(newVehiclesList);
          return newVehiclesList;
        case "EDIT":
          const newVehiclesListEdit = state.reduce((acc, vehicle) => {
            if (
              vehicle.plate.toLowerCase().trim() ===
              action.payload.plate.toLowerCase().trim()
            ) {
              return [...acc, action.payload];
            }
            return [...acc, vehicle];
          }, [] as IVehicle[]);
          LocalStorageVehicles.saveVehicles(newVehiclesListEdit);
          return newVehiclesListEdit;
        case "DELETE":
          const newVehiclesListDelete = state.filter(
            (_, index) => index !== action.payload.index
          );
          LocalStorageVehicles.saveVehicles(newVehiclesListDelete);
          return newVehiclesListDelete;
        default:
          return state;
      }
    },
    LocalStorageVehicles.getVehicles() ?? []
  );
  const {
    register,
    handleSubmit,
    formState: { isSubmitSuccessful },
    reset,
    watch,
    setValue,
  } = useForm<IVehicle & { isEditing?: boolean }>({
    defaultValues,
  });
  useEffect(() => {
    reset(defaultValues);
  }, [isSubmitSuccessful]);
  const isEditing = !!watch("isEditing");
  const onSubmit: SubmitHandler<IVehicle> = useCallback(
    (data) => {
      dispatch({ type: isEditing ? "EDIT" : "ADD", payload: data });
    },
    [isEditing]
  );
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid2 container padding={6}>
        <Grid2 xs={2} />
        <Grid2 xs={8} flexGrow={1}>
          <Grid2
            container
            spacing={4}
            justifyContent={"center"}
            direction={"column"}
          >
            <Grid2 spacing={2} container flexGrow={1}>
              <Grid2 xs={12} flex={"1 0 100%"}>
                <Typography
                  sx={{ mt: 4, mb: 2, textTransform: "capitalize" }}
                  variant="h5"
                  component="div"
                >
                  Informações do Veículo
                </Typography>
              </Grid2>
              <Grid2 xs={12} flex={"1 1 100%"}>
                <TextField
                  sx={{ width: "100%" }}
                  label="Marca"
                  variant="outlined"
                  {...register("brand", { required: true })}
                />
              </Grid2>
              <Grid2 flexGrow={1}>
                <TextField
                  label="Placa"
                  variant="outlined"
                  disabled={isEditing}
                  sx={{ width: "100%" }}
                  {...register("plate", { required: true })}
                />
              </Grid2>
              <Grid2 xs={6} flexGrow={1}>
                <TextField
                  label="Cor"
                  variant="outlined"
                  sx={{ width: "100%" }}
                  {...register("color", { required: true })}
                />
              </Grid2>
              <Grid2 xs={12} flex={"1 1 100%"}>
                {isEditing ? (
                  <ButtonGroup sx={{ width: "100%" }}>
                    <Button
                      sx={{ width: "100%" }}
                      onClick={() => reset(defaultValues)}
                    >
                      Cancelar
                    </Button>
                    <Button type="submit" variant="contained" fullWidth>
                      Modificar
                    </Button>
                  </ButtonGroup>
                ) : (
                  <Button type="submit" variant="contained" fullWidth>
                    Adicionar
                  </Button>
                )}
              </Grid2>
            </Grid2>
            {!!vehicles.length && (
              <Grid2 xs={6} container flexGrow={1}>
                <Paper sx={{ height: "100%", width: "100%" }} elevation={3}>
                  <List>
                    {vehicles.map((vehicle, index) => (
                      <ListItem key={`vehicle-index-${index}`}>
                        <ListItemText
                          primary={`${vehicle.brand} -  ${vehicle.color}`}
                          secondary={vehicle.plate}
                        />
                        <Box>
                          <ButtonGroup>
                            <Button
                              onClick={() => {
                                setValue("isEditing", true);
                                setValue("brand", vehicle.brand);
                                setValue("color", vehicle.color);
                                setValue("plate", vehicle.plate);
                              }}
                            >
                              Modificar
                            </Button>
                            <Button
                              onClick={() =>
                                dispatch({ type: "DELETE", payload: { index } })
                              }
                              color="error"
                            >
                              Deletar
                            </Button>
                          </ButtonGroup>
                        </Box>
                      </ListItem>
                    ))}
                  </List>
                </Paper>
              </Grid2>
            )}
          </Grid2>
        </Grid2>
        <Grid2 sm={2} />
      </Grid2>
    </form>
  );
};

export default Vehicle;
