export const apiGet = async (
  endpoint: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  params: { [key: string]: any }
) => {
  const data = await fetch(`/api${endpoint}?${new URLSearchParams(params)}`);
  return data.json();
};
