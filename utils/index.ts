export const getDecadeForYear: (year: number | string | undefined) => string = (
  year
) => {
  if (!year) return "";
  return `${year}`.slice(0, -1) + "0s";
};

export const getDecadeRange: (decade: string) => number[] = (decade) => {
  /* parseInt ignores letter characters (eg. parseInt("1960s") => 1960) */
  const startYear: number = parseInt(decade);
  const range: number[] = [];

  for (let i = startYear; i < startYear + 10; i++) {
    range.push(i);
  }
  return range;
};
