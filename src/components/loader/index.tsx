import { FunctionComponent } from "preact";
import _Backdrop from "@mui/material/Backdrop";
import LinearProgress from "@mui/material/LinearProgress";

const Loader: FunctionComponent<{ active: boolean; solid?: boolean }> = ({
  active,
  solid,
}) => {
  const Backdrop = _Backdrop as any;
  return (
    <div>
      <Backdrop
        sx={{
          color: "#fff",
          ...(solid ? { background: "black", opacity: 1 } : {}),
          zIndex: (theme: any) => theme.zIndex.drawer + 1,
        }}
        open={active}
      >
        <LinearProgress></LinearProgress>
      </Backdrop>
    </div>
  );
};

export default Loader;
