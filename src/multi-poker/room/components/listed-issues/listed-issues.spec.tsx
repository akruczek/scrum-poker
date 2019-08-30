import * as React from 'react';
import renderer, { act } from 'react-test-renderer';
import { TouchableHighlight } from 'react-native';
import { ListItem } from 'react-native-elements';
import { ScrollContainer } from '@core/styled';
import { ListedIssues } from './listed-issues';

describe('ListedIssues', () => {
  const issues: any = [
    { summary: 'Issue 1', key: 'x-1', id: 1 },
    { summary: 'Issue 2', key: 'x-2', id: 2 },
    { summary: 'Issue 3', key: 'x-3', id: 3 },
  ];
  const handleChoose = jest.fn();

  describe('when ListedIssues was mounted with all needed props', () => {
    const wrapper = renderer.create(
      <ListedIssues handleChoose={handleChoose} issues={issues} />
    );

    it('should render ScrollContainer', () => {
      expect(wrapper.root.findByType(ScrollContainer))
        .toBeTruthy();
    });

    it('should render as many ListItem as issues list length is', () => {
      expect(wrapper.root.findAllByType(ListItem))
        .toHaveLength(3);
    });

    it('should call handleChoose after press on ListItem with this item key', () => {
      act(() => {
        wrapper.root.findAllByType(TouchableHighlight)[1].props.onPress();
      });

      expect(handleChoose)
        .toHaveBeenCalledWith('x-2');
    });
  });
});
