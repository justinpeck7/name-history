import { queryOne } from "db";
import type { NextApiRequest, NextApiResponse } from "next";
import { NameRow } from "types";

export const getRandomName: () => Promise<string> = async () => {
  const randomName: Pick<NameRow, "name"> = await queryOne(
    "SELECT name FROM usa_names ORDER BY RANDOM() LIMIT 1"
  );

  return randomName?.name ?? "";
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Pick<NameRow, "name">>
) {
  const randomName = await getRandomName();

  res.status(200).json({ name: randomName });
}
