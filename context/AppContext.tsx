import { DECADES, STATUS } from "config";
import { Action, AppState, NameData } from "context/ContextTypes";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { DecadeMap, StateYearRangeData } from "types";
import { apiGet } from "utils/get";

const ACTIONS = {
  SET_DECADE_DATA: "SET_DECADE_DATA",
  LOADING_START: "LOADING_START",
  LOADING_END: "LOADING_END",
  SET_ERROR: "SET_ERROR",
  SET_STATE_DATA: "SET_STATE_DATA",
  STATUS: "STATUS",
};

const ERRORS = {
  NAME_NOT_FOUND: `Looks like we couldn't find any data on that name, try another?`,
  STATE_DATA_NOT_FOUND: `Looks like we couldn't find any state-specific data for that name.`,
};

const nameDataReducer = (state: NameData, action: Action): NameData => {
  const { type } = action;

  switch (type) {
    case ACTIONS.STATUS:
      if ("payload" in action) {
        return { ...state, status: action.payload as string };
      }
      return state;
    case ACTIONS.SET_ERROR:
      if ("payload" in action) {
        return { ...state, error: action.payload as string };
      }
      return state;
    case ACTIONS.SET_DECADE_DATA:
      if ("payload" in action) {
        return {
          ...state,
          byDecade: action.payload as DecadeMap,
          error: null,
          byState: null,
        };
      }
      return state;
    case ACTIONS.SET_STATE_DATA:
      if ("payload" in action) {
        return {
          ...state,
          byState: action.payload as StateYearRangeData,
          error: null,
        };
      }
      return state;
    default:
      return state;
  }
};

const AppContext = createContext<AppState>(null!);

const AppContextProvider = ({
  children,
  randomName,
}: {
  children: ReactNode;
  randomName: string;
}) => {
  const [state, setState] = useState<{ name: string; abbr: string } | null>(
    null
  );
  const [name, setName] = useState<string>(randomName || "");
  const [decade, setDecade] = useState<string>(DECADES[0]);
  const [nameData, dispatch] = useReducer(nameDataReducer, {
    error: null,
    status: STATUS.IDLE,
  });

  const fetchDataAllDecades = async () => {
    dispatch({ type: ACTIONS.STATUS, payload: STATUS.PENDING });
    setState(null); /* reset our selected state */
    try {
      const json: DecadeMap = await apiGet("/all-decades", { name });
      dispatch({ type: ACTIONS.SET_DECADE_DATA, payload: json });
      dispatch({ type: ACTIONS.STATUS, payload: STATUS.RESOLVED });
    } catch (e) {
      dispatch({ type: ACTIONS.SET_ERROR, payload: ERRORS.NAME_NOT_FOUND });
      dispatch({ type: ACTIONS.STATUS, payload: STATUS.REJECTED });
    }
  };

  const fetchDataByState = async () => {
    dispatch({ type: ACTIONS.STATUS, payload: STATUS.PENDING });
    try {
      const json: StateYearRangeData = await apiGet("/by-state", {
        name,
        decade,
        state: state?.abbr,
      });
      dispatch({ type: ACTIONS.SET_STATE_DATA, payload: json });
      dispatch({ type: ACTIONS.STATUS, payload: STATUS.RESOLVED });
    } catch {
      dispatch({ type: ACTIONS.SET_ERROR, payload: ERRORS.NAME_NOT_FOUND });
      dispatch({ type: ACTIONS.STATUS, payload: STATUS.REJECTED });
    }
  };

  useEffect(() => {
    if (state?.abbr && nameData?.byDecade?.[decade]) {
      fetchDataByState();
    }
    /* We only want to fetch when the selected state or decade changes */
  }, [state, decade]);

  return (
    <AppContext.Provider
      value={{
        decadeData: nameData?.byDecade?.[decade] || null,
        stateData: nameData?.byState || null,
        status: nameData?.status,
        state,
        setState,
        name,
        setName,
        decade,
        setDecade,
        fetchDataAllDecades,
        fetchDataByState,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => useContext(AppContext);

export { AppContextProvider, useAppContext };
