import * as React from 'react';
import renderer, { act } from 'react-test-renderer';
import { TouchableHighlight } from 'react-native';
import { ListedProject } from './listed-project';
import { ListItem } from 'react-native-elements';

describe('ListedProject', () => {
  const handleChoose = jest.fn();
  const project = {
    id: '1234',
    key: 'key',
    avatarUrl: 'url',
    displayName: 'PROJECT',
  };

  describe('when ListedProject was mounted with all needed props', () => {
    const wrapper = renderer.create(
      <ListedProject {...{ handleChoose, project }} />
    );

    it('should render TouchableHighlight component', () => {
      expect(wrapper.root.findAllByType(TouchableHighlight).length)
        .toEqual(1);
    });

    it('should call handleChoose with given project after press on TouchableHighlight', () => {
      act(() => {
        wrapper.root.findByType(TouchableHighlight).props.onPress();
      });

      expect(handleChoose)
        .toHaveBeenCalledWith(project);
    });

    it('should render ListItem component', () => {
      expect(wrapper.root.findAllByType(ListItem).length)
        .toEqual(1);
    });
  });
});
