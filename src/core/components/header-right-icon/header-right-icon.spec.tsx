import * as React from 'react';
import renderer from 'react-test-renderer';
import { HeaderRightIcon } from './header-right-icon';
import { NOOP } from '../../helpers';
import { TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';

describe('HeaderRightIcon', () => {
  describe('when HeaderRightIcon was mounted with all needed props', () => {
    const wrapper = renderer.create(
      <HeaderRightIcon icon="arrow-drop-up" onPress={NOOP} />
    );

    it('should render Icon component with passed icon prop wrapped with TouchableOpacity ', () => {
      expect(wrapper.root.findByType(TouchableOpacity).findByType(Icon).props.name)
        .toEqual('arrow-drop-up');
    });
  });
});
