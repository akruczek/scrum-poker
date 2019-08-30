import * as React from 'react';
import renderer, { act } from 'react-test-renderer';
import { Text } from '@core/styled';
import { CardButton } from '@core/components';
import { EstimationsList } from './estimations-list';

describe('EstimationsList', () => {
  const estimationsList = [
    { value: 1, label: '1' },
    { value: 2, label: '2' },
    { value: 3, label: '3' },
    { value: 5, label: '5' },
  ];
  const setFinalEstimation = jest.fn();

  describe('when EstimationsList was mounted with all needed props', () => {
    describe('and estimationsList prop is provided', () => {
      const wrapper = renderer.create(
        <EstimationsList {...{ estimationsList, setFinalEstimation }} />
      );

      it('should render Text component', () => {
        expect(wrapper.root.findAllByType(Text).length)
          .toBeGreaterThan(0);
      });

      it('should render as many CardButton components as estimationsList length is', () => {
        expect(wrapper.root.findAllByType(CardButton).length)
          .toEqual(estimationsList.length);
      });

      it('should call setFinalEstimation after call CardButton handleSelect prop with its card value', () => {
        act(() => {
          wrapper.root.findAllByType(CardButton)[0].props.handleSelect();
        });

        expect(setFinalEstimation)
          .toHaveBeenCalledWith('1');
      });
    });

    describe('and estimationsList prop is not provided', () => {
      describe('and estimationsList prop is provided', () => {
        const wrapper = <EstimationsList {...{ estimationsList: [], setFinalEstimation }} />

        it('should render nothing', () => {
  
        });
      });
    });
  });
});
