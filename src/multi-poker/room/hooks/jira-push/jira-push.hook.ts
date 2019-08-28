import * as React from 'react';
import { SetIssueStoryPointsPayload } from '@core/models';
import { jiraPusherUpdate } from '../../helpers';

type ReturnType = [
  boolean,
  boolean,
  () => void,
];

export const useJiraPush = (
  issueKey: string,
  finalEstimation: number | string,
  isPending: boolean,
  isSuccess: boolean,
  isError: boolean,
) => (
  setIssueStoryPoints: (payload: SetIssueStoryPointsPayload) => void,
  clearJiraStatus: () => void,
  handleClose: () => void,
  handleReset: () => void,
): ReturnType => {
  const [ displaySuccess, setSuccess ] = React.useState(false);
  const [ displayError, setError ] = React.useState(false);
  const [ waiting, setWaiting ] = React.useState(false);

  const handlePush = () => {
    setWaiting(true);
    setIssueStoryPoints({ issueKey, value: Number(finalEstimation) || 0 });
  };

  React.useEffect(() => {
    jiraPusherUpdate(isPending, waiting, isSuccess, isError)(
      setSuccess, setError, setWaiting, clearJiraStatus, handleClose, handleReset,
    );
  });

  return [ displaySuccess, displayError, handlePush ];
};
