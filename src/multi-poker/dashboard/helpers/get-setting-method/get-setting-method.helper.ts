import * as R from 'ramda';

export const getSettingMethod = (
  setName: (name: string) => void,
  setDescription: (description: string) => void,
  setProjectKey: (projectKey: string) => void,
) => R.prop(R.__, {
  name: setName,
  description: setDescription,
  projectKey: setProjectKey,
});
