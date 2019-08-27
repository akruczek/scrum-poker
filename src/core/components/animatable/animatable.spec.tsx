import * as React from 'react';
import renderer from 'react-test-renderer';
import * as _Animatable from 'react-native-animatable';
import { Animatable } from './animatable';
import { Text } from '../../styled';
import { STATIC_ANIMATIONS } from '../../models';

describe('Animatable', () => {
  describe('when Animatable component was mounted with all needed props', () => {
    const wrapper = renderer.create(
      <Animatable animation={STATIC_ANIMATIONS.BOUNCE} iterationCount="infinite">
        <Text>Hello</Text>
      </Animatable>
    );
    
    it('should render Animatable.View with all passed props and easing=ease prop', () => {
      expect(wrapper.root.findByType(_Animatable.View))
        .toBeTruthy();
    });
  });
});
