import * as React from 'react';

export const useGetProjectIssues = (
  getProjectIssues: () => void,
) => {
  React.useEffect(() => {
    getProjectIssues();
  }, []);
};
