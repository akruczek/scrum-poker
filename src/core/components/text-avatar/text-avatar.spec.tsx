import * as React from 'react';
import renderer from 'react-test-renderer';
import { TextAvatar } from './text-avatar';
import { Text } from '../../styled';
import { TEXT_SIZES } from '../../constants';

describe('TextAvatar', () => {
  describe('when TextAvatar was mounted with all needed props', () => {
    describe('and content prop length is not greater than 3', () => {
      const wrapper = renderer.create(
        <TextAvatar content="775" />
      );

      it('should render Text component with regular text size and given content inside', () => {
        const text = wrapper.root.findByType(Text);

        expect(text.props.size)
          .toEqual(TEXT_SIZES.REGULAR);
        expect(text.props.children)
          .toEqual('775');
      });
    });

    describe('and content prop length equals 4 or 5', () => {
      const wrapper = renderer.create(
        <TextAvatar content="hello" />
      );

      it('should render Text component with tiny text size and given content inside', () => {
        const text = wrapper.root.findByType(Text);

        expect(text.props.size)
          .toEqual(TEXT_SIZES.TINY);
        expect(text.props.children)
          .toEqual('hello');
      });
    });

    describe('and content prop length is greater than 5', () => {
      const wrapper = renderer.create(
        <TextAvatar content="project" />
      );

      it('should render Text component with tiny text size and given content inside', () => {
        const text = wrapper.root.findByType(Text);

        expect(text.props.size)
          .toEqual(TEXT_SIZES.TINY);
        expect(text.props.children)
          .toEqual('project');
      });
    });
  });
});
