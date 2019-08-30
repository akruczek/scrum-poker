import * as React from 'react';
import renderer, { act } from 'react-test-renderer';
import { Text, Separator } from '@core/styled';
import { EstimationField } from './estimation-field';
import { Input } from 'react-native-elements';

describe('EstimationField', () => {
  const setFinalEstimation = jest.fn();

  describe('when EstimationField was mounted with all needed props', () => {
    const wrapper = renderer.create(
      <EstimationField finalEstimation="1" setFinalEstimation={setFinalEstimation} />
    );

    it('should render one Text component', () => {
      expect(wrapper.root.findAllByType(Text))
        .toHaveLength(1);
    });

    it('should render one Separator', () => {
      expect(wrapper.root.findAllByType(Separator))
        .toHaveLength(1);
    });

    it('should render one Input component', () => {
      expect(wrapper.root.findAllByType(Input))
        .toHaveLength(1);
    });

    it('should call setFinalEstimation with given value when Input value changed', () => {
      act(() => {
        wrapper.root.findByType(Input).props.onChangeText('x');
      });
      
      expect(setFinalEstimation)
        .toHaveBeenCalledWith('x');
    });
  });
});
