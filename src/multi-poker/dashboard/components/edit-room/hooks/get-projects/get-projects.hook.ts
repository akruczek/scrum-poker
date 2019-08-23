import * as React from 'react';

export const useGetProjects = (
  getProjects: () => void,
) => {
  React.useEffect(() => {
    getProjects();
  }, []);
};
