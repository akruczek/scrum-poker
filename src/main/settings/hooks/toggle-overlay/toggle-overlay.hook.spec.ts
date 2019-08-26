import { act } from 'react-test-renderer';
import { testHook } from '@test-utils/test-hook';
import { useToggleOverlay } from './toggle-overlay.hook';

describe('useToggleOverlay', () => {
  const navigation: any = { setParams: jest.fn() }
  let hook: any;

  describe('when useToggleOverlay hook was called', () => {
    beforeEach(() => {
      testHook(() => {
        hook = useToggleOverlay(navigation);
      });
    });
    
    it('should return "false" isSelectingLanguage at the beginning', () => {
      const [ isSelectingLanguage ] = hook;

      expect(isSelectingLanguage)
        .toBeFalsy();
    });

    it('should return "true" isSelectingLanguage after call toggleOverlay with true', () => {
      const [ _, toggleOverlay ] = hook;

      act(() => {
        toggleOverlay(true);
      });

      const [ isSelectingLanguage ] = hook;

      expect(isSelectingLanguage)
        .toBeTruthy();
    });
  });
});
