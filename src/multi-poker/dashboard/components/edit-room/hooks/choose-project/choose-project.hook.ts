import * as React from 'react';
import { JiraProjectModel } from '@core/models';
import { isPresent } from '@core/helpers';

type ReturnType = [
  boolean,
  (value: boolean) => void,
  (project: JiraProjectModel) => void,
];

export const useChooseProject = (
  handleChange: (prop: 'projectKey' | 'name', value: string) => void,
): ReturnType => {
  const [ isChoosingProject, chooseProject ] = React.useState(false);

  const handleChooseProject = ({ key, displayName }: JiraProjectModel) => {
    chooseProject(false);
    handleChange('projectKey', key);
    handleChange('name', isPresent(key) ? displayName : '');
  }

  return [ isChoosingProject, chooseProject, handleChooseProject ]
};
