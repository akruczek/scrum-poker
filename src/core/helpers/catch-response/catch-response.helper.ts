export const catchResponse = (
  error: string,
  noCallback?: boolean,
) => async (response: Response) => {
  if (response.ok) {
    if (!noCallback) {
      const data = await response.json();
      return data;
    }
    return response;
  }
  throw Error(error);
};
