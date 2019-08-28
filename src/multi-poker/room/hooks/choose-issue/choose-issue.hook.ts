import * as React from 'react';

type ReturnType = [
  boolean,
  (value: boolean) => void,
  (key: string) => void,
];

export const useChooseIssue = (
  setIssueKey: (key: string) => void,
): ReturnType => {
  const [ isChoosingIssue, chooseIssue ] = React.useState(false);

  const handleChooseIssue = (key: string) => {
    setIssueKey(key);
    chooseIssue(false);
  };

  return [ isChoosingIssue, chooseIssue, handleChooseIssue ];
};
