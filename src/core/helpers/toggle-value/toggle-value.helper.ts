import * as R from 'ramda';

export const toggleValue =
  (key: string, value?: boolean) =>
    (obj: {[key: string]: boolean}) => ({
      [key]: R.isNil(value) ? !obj[key] : value,
    } as {});
