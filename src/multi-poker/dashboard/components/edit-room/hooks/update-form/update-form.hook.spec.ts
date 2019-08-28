import { act } from 'react-test-renderer';
import { testHook } from '@test-utils/test-hook';
import { pokers } from '@core/constants';
import { useUpdateForm } from './update-form.hook';

describe('useUpdateForm', () => {
  let hook: any;

  describe('when useUpdateForm hooke was called', () => {
    beforeEach(() => {
      testHook(() => {
        hook = useUpdateForm();
      });
    });

    it('should return all fields as empty string by default', () => {
      const [ name, description, projectKey, allAdmins, poker ] = hook;

      const expectedValues = [ '', '', '', false, pokers[0] ];

      [ name, description, projectKey, allAdmins, poker ].map((value, index) => {
        expect(value)
          .toEqual(expectedValues[index]);
      });
    });

    it('should set replace field value with given value after call specific field setter', () => {
      const [
        _, __, ___, ____, _____, 
        setName, setDescription, setProjectKey, setAllAdmins, setPoker,
      ] = hook;

      const values = [ 'newName', 'newDesc', 'newKey', true, pokers[1] ];

      act(() => {
        [ setName, setDescription, setProjectKey, setAllAdmins, setPoker ].map((method, index) => {
          method(values[index]);
        });
      });

      const [ name, description, projectKey, allAdmins, poker ] = hook;

      [ name, description, projectKey, allAdmins, poker ].map((value, index) => {
        expect(value)
          .toEqual(values[index]);
      });
    });
  });
});
