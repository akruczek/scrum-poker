import * as React from 'react';
import { JiraProjectModel } from '@core/models';

type ReturnType = [
  boolean,
  (value: boolean) => void,
  (project: JiraProjectModel) => void,
];

export const useChooseProject = (
  handleChange: (prop: 'projectKey' | 'name', value: string) => void,
): ReturnType => {
  const [ isChoosingProject, chooseProject ] = React.useState(false);

  const handleChooseProject = (project: JiraProjectModel) => {
    chooseProject(false);
    handleChange('projectKey', project.key);
    handleChange('name', project.displayName);
  }

  return [ isChoosingProject, chooseProject, handleChooseProject ]
};
