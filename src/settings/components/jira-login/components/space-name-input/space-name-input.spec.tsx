import * as React from 'react';
import renderer from 'react-test-renderer';
import { translate } from '@core/services/translations/translate';
import { TRANSLATIONS } from '@core/models';
import { SpaceNameInput } from './space-name-input';
import { JiraLoginInput } from '../jira-login-input/jira-login-input';
import { SpaceNameTooltip } from '../space-name-tooltip/space-name-tooltip';
import { Tooltip } from 'react-native-elements';

describe('SpaceNameInput', () => {
  const setSpaceName = jest.fn();

  describe('when SpaceNameInput was mounted with all needed props', () => {
    const wrapper: any = renderer.create(
      <SpaceNameInput spaceName="My Space" setSpaceName={setSpaceName} />
    );

    it('should render JiraLoginInput component with TRANSLATIONS.SPACE_NAME placeholder and given props', () => {
      const { props } = wrapper.root.findByType(JiraLoginInput);

      expect(props.placeholder)
        .toEqual(translate(TRANSLATIONS.SPACE_NAME));
      expect(props.value)
        .toEqual('My Space');
      expect(props.onChange)
        .toEqual(setSpaceName);
    });

    it('should render Tooltip component with SpaceNameTooltip as popover prop', () => {
      expect(wrapper.root.findByType(Tooltip).props.popover.type)
        .toEqual(SpaceNameTooltip);
    });
  });
});
