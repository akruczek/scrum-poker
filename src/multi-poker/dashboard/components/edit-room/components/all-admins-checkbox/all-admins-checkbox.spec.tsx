import * as React from 'react';
import renderer, { act } from 'react-test-renderer';
import { AllAdminsCheckbox } from './all-admins-checkbox';
import { Checkbox } from '@core/components/checkbox-button/checkbox-button';

describe('AllAdminsCheckbox', () => {
  describe('when AllAdminsCheckbox was mounted with all needed props', () => {
    const setAllAdmins = jest.fn();

    describe('and "isCreating" props equals "true"', () => {
      const wrapper = renderer.create(
        <AllAdminsCheckbox setAllAdmins={setAllAdmins} isCreating />
      );

      it('should render Checkbox component', () => {
        expect(wrapper.root.findByType(Checkbox))
          .toBeTruthy();
      });

      it('should call setAllAdmins after call onChange Checkbox prop', () => {
        act(() => {
          wrapper.root.findByType(Checkbox).props.onChange();
        });

        expect(setAllAdmins)
          .toHaveBeenCalled();
      });
    });

    describe('and "isCreating" props equals "true"', () => {
      const wrapper = renderer.create(
        <AllAdminsCheckbox setAllAdmins={setAllAdmins} isCreating={false} />
      );

      it('should render null', () => {
        expect(wrapper.root.findAllByType(Checkbox).length)
          .toEqual(0);
      });
    });
  });
});
