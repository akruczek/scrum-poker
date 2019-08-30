import * as React from 'react';
import renderer, { act } from 'react-test-renderer';
import { IssuesListButtonsSet } from './issues-list-buttons-set';
import { View } from 'react-native';
import { Button } from 'react-native-elements';

describe('IssuesListButtonsSet', () => {
  const handleClose = jest.fn();

  describe('when IssuesListButtonsSet was mounted with all needed props', () => {
    const wrapper = renderer.create(
      <IssuesListButtonsSet handleClose={handleClose} />
    );

    it('should render Button wrapper with View', () => {
      expect(wrapper.root.findByType(View).findByType(Button))
        .toBeTruthy();
    });

    it('should call handleClose prop after press on Button', () => {
      act(() => {
        wrapper.root.findByType(Button).props.onPress();
      });

      expect(handleClose)
        .toHaveBeenCalled();
    });
  });
});
