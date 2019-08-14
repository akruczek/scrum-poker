import * as React from 'react';
import * as R from 'ramda';
import renderer from 'react-test-renderer';
import { ListedNewRoom } from './listed-new-room';
import { Divider, ListItem } from 'react-native-elements';
import { TouchableOpacity } from 'react-native';

describe('ListedNewRoom', () => {
  const setCreateRoom = jest.fn();

  describe('when ListedNewRoom was mounted with all needed props', () => {
    const wrapper = renderer.create(
      <ListedNewRoom setCreateRoom={setCreateRoom} />
    );

    it('should render ListItem inside TouchableOpacity', () => {
      expect(wrapper.root.findByType(TouchableOpacity).findByType(ListItem))
        .toBeTruthy();
    });

    it('should render Divider as last child', () => {
      expect(wrapper.root.findByType(Divider))
        .toBeTruthy();
    });
  });
});
