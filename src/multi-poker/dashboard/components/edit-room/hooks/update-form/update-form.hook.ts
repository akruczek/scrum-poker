import * as React from 'react';
import { pokers } from '@core/constants';
import { PokerModel } from '@core/models';

type ReturnType = [
  string, string, string, boolean, PokerModel,
  (name: string) => void,
  (description: string) => void, 
  (projectKey: string) => void,
  (allAdmins: boolean) => void,
  (poker: PokerModel) => void,
];

export const useUpdateForm = (): ReturnType => {
  const [ name, setName ] = React.useState('');
  const [ description, setDescription ] = React.useState('');
  const [ projectKey, setProjectKey ] = React.useState('');
  const [ allAdmins, setAllAdmins ] = React.useState(false);
  const [ poker, setPoker ] = React.useState(pokers[0]);

  return [
    name, description, projectKey, allAdmins, poker,
    setName, setDescription, setProjectKey, setAllAdmins, setPoker,
  ];
};