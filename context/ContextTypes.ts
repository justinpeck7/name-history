import { DecadeMap, StateMap, StateYearRangeData } from "types";

export type AppState = {
  name: string;
  setName(name: string): void;
  decade: string;
  setDecade(decade: string): void;
  state: { name: string; abbr: string } | null;
  setState(args: { name: string; abbr: string }): void;
  fetchDataAllDecades(): void;
  fetchDataByState(): void;
  decadeData: StateMap | null;
  stateData: StateYearRangeData | null;
  status: string;
};

export type NameData = {
  byDecade?: DecadeMap;
  byState?: StateYearRangeData | null;
  status: string;
  error?: string | null;
};

export type Action = {
  type: string;
  payload?: DecadeMap | StateYearRangeData | string;
};
