import * as React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { TRANSLATIONS } from '@core/models';
import { translate } from '@core/services/translations/translations.service';
import { _MultiPlayer, MultiPlayer } from './multi-player';
import { Dashboard } from '../../multi-poker/dashboard/dashboard';
import { Auth } from '../../auth/auth';

describe('MultiPlayer', () => {
  const mockedNavigation: any = {
    navigate: jest.fn(),
  };

  const renderer = new (ShallowRenderer as any)();

  describe('when MultiPlayer was mounted with all needed props', () => {
    beforeEach(() => {
      renderer.render(
        <_MultiPlayer navigation={mockedNavigation} email="test@example.com" />,
      );
    });

    it('should render Dashboard component', () => {
      expect(renderer.getRenderOutput())
        .toEqual(<Dashboard navigation={mockedNavigation} />);
    });

    it('should render Dashboard with TRANSLATIONS.MULTI_PLAYER title', () => {
      expect(MultiPlayer.navigationOptions().title)
        .toEqual(translate(TRANSLATIONS.MULTI_PLAYER));
    });
  });

  describe('when MultiPlayer was mounted with undefined email prop', () => {
    beforeEach(() => {
      renderer.render(
        <_MultiPlayer navigation={mockedNavigation} email={undefined as any} />,
      );
    });

    it('should render Auth component with auth type JOIN', () => {
      expect(renderer.getRenderOutput())
        .toEqual(<Auth type="join" />);
    });
  });
});
