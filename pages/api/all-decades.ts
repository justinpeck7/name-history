import { getDecadeForYear } from "utils";
import { queryAll } from "db";
import type { NextApiRequest, NextApiResponse } from "next";
import { DecadeMap, NameRow } from "types";
import { MAP_COLOR_LEVELS, TOTAL_NAMES_PER_DECADE } from "config";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<DecadeMap>
) {
  const name = (req.query?.name as string)?.toLowerCase();
  try {
    const sql = `SELECT count, state, year FROM usa_names WHERE LOWER(name) = $1`;
    const results: NameRow[] = await queryAll(sql, [name]);
    const decadeMap: DecadeMap = {};

    for (const { year, state, count } of results) {
      const decade = getDecadeForYear(year);

      decadeMap[decade] = decadeMap[decade] || {};

      const updatedCount = (decadeMap[decade]?.[state]?.count || 0) + count;

      decadeMap[decade][state] = { count: updatedCount };
    }

    /* Convenience for the FE - calculate map coloring */
    const minRatioMap: { [decade: string]: number } = {};

    for (const [decade] of Object.entries(decadeMap)) {
      for (const [state, data] of Object.entries(decadeMap[decade])) {
        const percentTotalNames =
          data.count / TOTAL_NAMES_PER_DECADE[decade][state];

        if (percentTotalNames > minRatioMap[decade] || !minRatioMap[decade]) {
          minRatioMap[decade] = percentTotalNames;
        }
        decadeMap[decade][state].percentTotalNames = percentTotalNames;
      }
    }

    /* Normalize the data a bit so it's easier to place into tiers */
    for (const [decade] of Object.entries(decadeMap)) {
      const multiplier = 100 / minRatioMap[decade];

      for (const [state, data] of Object.entries(decadeMap[decade])) {
        /* Math.min to account for floating point oddites where we get 100.00001 etc. */
        const normalizedRatio = Math.min(
          (data.count / TOTAL_NAMES_PER_DECADE[decade][state]) * multiplier,
          100
        );
        decadeMap[decade][state].color =
          MAP_COLOR_LEVELS[Math.ceil(normalizedRatio / 5) * 5];
      }
    }

    res.status(200).json(decadeMap);
  } catch (e) {
    /* Real pretty error handling */
    console.log(e);
    res.status(500);
  }
}
