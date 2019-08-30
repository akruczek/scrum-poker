import * as React from 'react';
import renderer from 'react-test-renderer';
import { Text, Separator } from '@core/styled';
import { JiraPusherHeader } from './jira-pusher-header';

describe('JiraPusherHeader', () => {
  describe('when JiraPusherHeader was mounted', () => {
    const wrapper = renderer.create(
      <JiraPusherHeader />
    );

    it('should render one Text component', () => {
      expect(wrapper.root.findAllByType(Text))
        .toHaveLength(1);
    });

    it('should render one Separator component', () => {
      expect(wrapper.root.findAllByType(Separator))
        .toHaveLength(1);
    });
  });
});
