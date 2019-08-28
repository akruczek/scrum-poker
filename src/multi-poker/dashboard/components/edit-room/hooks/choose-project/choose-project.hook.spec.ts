import { act } from 'react-test-renderer';
import { testHook } from '@test-utils/test-hook';
import { JiraProjectModel } from '@core/models';
import { useChooseProject } from './choose-project.hook';

describe('useChooseProject', () => {
  const handleChange = jest.fn();
  const project: JiraProjectModel = {
    id: '1234',
    key: 'key',
    avatarUrl: 'url',
    displayName: 'name',
  };
  let hook: any;

  describe('when useChooseProject hook was called', () => {
    beforeEach(() => {
      testHook(() => {
        hook = useChooseProject(handleChange);
      });
    });

    it('should return "false" isChoosingProject by default', () => {
      const [ isChoosingProject ] = hook;

      expect(isChoosingProject)
        .toBeFalsy();
    });

    it('should return "true" isChoosingProject after call chooseProject method with "true"', () => {
      const [ _, chooseProject ] = hook;

      act(() => {
        chooseProject(true);
      });

      const [ isChoosingProject ] = hook;
      
      expect(isChoosingProject)
        .toBeTruthy();
    });

    it('should return "false" isChoosingProject and call handleChange after call handleChooseProject', () => {
      const [ _, __, handleChooseProject ] = hook;

      act(() => {
        handleChooseProject(project);
      });

      const [ isChoosingProject ] = hook;

      expect(isChoosingProject)
        .toBeFalsy();
      expect(handleChange)
        .toHaveBeenCalledWith('projectKey', project.key);
      expect(handleChange)
        .toHaveBeenCalledWith('name', project.displayName);
    });
  });
});
