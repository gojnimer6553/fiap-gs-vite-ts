import { FunctionComponent, createContext } from "preact";
import Loader from "../../components/loader";
import { useReducer } from "preact/hooks";

const GlobalContext = createContext({});

const GlobalProvider: FunctionComponent = ({ children }) => {
  //Adicionar loading futuramente
  const [active, loader] = useReducer((a: boolean, _b: string) => !a, true);
  return (
    <GlobalContext.Provider value={{}}>
      {children}
      {/*   <Loader {...{ active }} /> */}
    </GlobalContext.Provider>
  );
};

export { GlobalContext, GlobalProvider };
