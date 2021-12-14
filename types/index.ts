export type NameRow = {
  id: number;
  name: string;
  state: string;
  sex: string;
  year: number;
  count: number;
};

export type StateMap = {
  [state: string]: {
    count: number;
    color?: string;
    percentTotalNames?: number;
  };
};

export type DecadeMap = {
  [decade: string]: StateMap;
};

export type StateYearRangeData = {
  years: number[];
  maleNameCounts: number[];
  femaleNameCounts: number[];
  state: string;
};
