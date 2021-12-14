import { queryAll } from "db";
import type { NextApiRequest, NextApiResponse } from "next";
import { StateYearRangeData } from "types";
import { getDecadeRange } from "utils";
import NodeCache from "node-cache";

const cache = new NodeCache({ stdTTL: 1000 });

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<StateYearRangeData>
) {
  const cached = cache.get(req.url as string);
  if (cached) {
    res.status(200).json(cached as StateYearRangeData);
    return;
  }

  const name = (req.query?.name as string)?.toLowerCase();
  const state = req.query?.state as string;
  const decade = req.query?.decade as string;

  const decadeRange: number[] = getDecadeRange(decade);

  try {
    const sql = `SELECT count, year, sex FROM usa_names
      WHERE year BETWEEN
     $1 AND $2
      AND LOWER(name) = $3 AND state = $4`;

    const results = await queryAll(sql, [
      decadeRange[0],
      decadeRange[decadeRange.length - 1],
      name,
      state,
    ]);

    /* Fill out our arrays with 0s when no data exists */
    const yearSexMap = results.reduce(
      (accum: { [yearSex: string]: number }, current) => {
        accum[`${current.year}-${current.sex}`] = current.count;
        return accum;
      },
      {}
    );

    const maleNameCounts: number[] = [];
    const femaleNameCounts: number[] = [];

    for (const year of decadeRange) {
      maleNameCounts.push(yearSexMap[`${year}-M`] || 0);
      femaleNameCounts.push(yearSexMap[`${year}-F`] || 0);
    }
    const response: StateYearRangeData = {
      years: decadeRange,
      maleNameCounts,
      femaleNameCounts,
      state,
    };

    cache.set(req.url as string, response);
    res.status(200).json(response);
  } catch (e) {
    console.log(e);
    res.status(500);
  }
}
