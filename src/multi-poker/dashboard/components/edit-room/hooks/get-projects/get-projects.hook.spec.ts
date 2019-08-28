import { testHook } from '@test-utils/test-hook';
import { useGetProjects } from './get-projects.hook';

describe('useGetProjects', () => {
  const getProjects = jest.fn();

  describe('when useGetProjects hook was called', () => {
    it('should call getProjects once', () => {
      testHook(() => {
        useGetProjects(getProjects);
      });

      expect(getProjects)
        .not.toHaveBeenCalledTimes(1);
    });
  });
});
