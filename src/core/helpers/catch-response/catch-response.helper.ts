export const catchResponse = (
  error: string,
) => async (response: any) => {
  if (response.ok) {
    const data = await response.json();
    return data;
  }
  throw Error(error);
}