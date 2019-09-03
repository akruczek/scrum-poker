import * as React from 'react';
import renderer from 'react-test-renderer';
import { TextAvatar } from '@core/components';
import { ListedProjectIcon } from './listed-project-icon';

describe('ListedProjectIcon', () => {
  describe('when ListedProjectIcon was mounted with all needed props', () => {
    describe('and given content is present', () => {
      const wrapper = renderer.create(
        <ListedProjectIcon content="CONTENT" />
      );

      it('should render TextAvatar with given content', () => {
        expect(wrapper.root.findByType(TextAvatar).props.content)
          .toEqual('CONTENT');
      });
    });

    describe('and given content is not present', () => {
      const wrapper = renderer.create(
        <ListedProjectIcon content={null as any} />
      );

      it('should render TextAvatar with empty string content', () => {
        expect(wrapper.root.findByType(TextAvatar).props.content)
          .toEqual('');
      });
    });
  });
});
