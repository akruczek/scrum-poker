import { getRiskCardColor } from './get-risk-card-color.helper';
import { colors as elementsColors } from 'react-native-elements';

describe('when getRiskCardColor was called', () => {
  describe('and given card is not risk card', () => {
    const card = { value: 1, label: '1' };

    it('should return primary color', () => {
      expect(getRiskCardColor(card))
        .toEqual(elementsColors.primary);
    });
  });

  describe('and given value is risk card', () => {
    const card = { value: 'risk-red', label: 'red' };

    it('should get specific color based on card value', () => {
      expect(getRiskCardColor(card))
        .toEqual('#2089dc');
    });
  });
});
