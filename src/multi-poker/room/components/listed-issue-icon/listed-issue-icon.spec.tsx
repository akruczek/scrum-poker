import * as React from 'react';
import renderer from 'react-test-renderer';
import { TextAvatar } from '@core/components';
import { ListedIssueIcon } from './listed-issue-icon';

describe('ListedIssueIcon', () => {
  describe('when ListedIssueIcon was mounted with all needed props', () => {
    describe('and content prop is empty', () => {
      const wrapper = renderer.create(
        <ListedIssueIcon content="" />
      );

      it('should render TextAvatar with empty string as content prop', () => {
        expect(wrapper.root.findByType(TextAvatar).props.content)
          .toEqual('');
      });
    });

    describe('and content prop is not empty', () => {
      const wrapper = renderer.create(
        <ListedIssueIcon content="ISS-770" />
      );

      it('should render TextAvatar with given string value after "-" char', () => {
        expect(wrapper.root.findByType(TextAvatar).props.content)
          .toEqual('770');
      });
    });
  });
});
