import { testHook } from '@test-utils/test-hook';
import { CARDS, CARDS_STACK } from '@core/constants';
import { useSelectCard } from './select-cards.hook';

describe('useSelectCard', () => {
  const navigation: any = {
    getParam: (...args: any) => CARDS.STANDARD_POKER,
  };
  let hook: any;

  describe('when useSelectCard hook was called', () => {
    beforeEach(() => {
      testHook(() => {
        hook = useSelectCard(navigation);
      });
    });

    it('should return undefined selectedCard and CARDS_STACK from navigation param at the beginning', () => {
      const [ cards, selectedCard ] = hook;

      expect(cards)
        .toEqual(CARDS_STACK[CARDS.STANDARD_POKER]);
      expect(selectedCard)
        .toBe(undefined);
    });
  });
});
