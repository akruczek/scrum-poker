import { pokers } from '@core/constants';
import { SCREENS } from '@core/constants';
import { navigateToPoker } from './navigate-to-poker.helper';

describe('when navigateToPoker was called', () => {
  const navigate = jest.fn();
  
  beforeEach(() => {
    navigateToPoker(navigate)(pokers[0]);
  });

  it('should call given navigate function with single poker screen and given poker', () => {
    const expectedArguments = [
      SCREENS.SINGLE_POKER,
      { title: pokers[0].title, cards: pokers[0].cards },
    ];

    expect(navigate)
      .toHaveBeenCalledWith(...expectedArguments);
  });
});
