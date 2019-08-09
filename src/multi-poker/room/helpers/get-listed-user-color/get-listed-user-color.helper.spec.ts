import { getListedUserColor } from './get-listed-user-color.helper';
import { COLORS } from '@core/constants';

describe('when getListedUserColor was called', () => {
  describe('and room is not discovered', () => {
    const isRoomDiscovered = false;

    describe('and value is not preset', () => {
      const isValuePreset = false;
      const isDivergence = false;
      const isEqualDivergence = false;
      const selectedValue = 0;

      it('should return WHITE color', () => {
        expect(getListedUserColor(isRoomDiscovered, isDivergence, isEqualDivergence, isValuePreset, selectedValue))
          .toEqual(COLORS.WHITE);
      });
    });

    describe('and value is present', () => {
      const isValuePreset = true;
      const isDivergence = false;
      const isEqualDivergence = false;
      const selectedValue = 0;

      it('should return GREEN color', () => {
        expect(getListedUserColor(isRoomDiscovered, isDivergence, isEqualDivergence, isValuePreset, selectedValue))
        .toEqual(COLORS.GREEN_OPACITY);
      });
    });
  });

  describe('and room is discovered', () => {
    const isRoomDiscovered = true;

    describe('and selectedValue is not a number', () => {
      const selectedValue: any = '?';
      const isDivergence = false;
      const isEqualDivergence = false;
      const isValuePreset = false;

      it('should return YELLOW_OPACITY color', () => {
        expect(getListedUserColor(isRoomDiscovered, isDivergence, isEqualDivergence, isValuePreset, selectedValue))
          .toEqual(COLORS.YELLOW_OPACITY);
      });
    });

    describe('and there is divergence', () => {
      const isDivergence = true;

      describe('and estimated value equals one of divergences', () => {
        const isEqualDivergence = true;
        const isValuePreset = false;
        const selectedValue = 1;

        it('should return RED_OPACITY color', () => {
          expect(getListedUserColor(isRoomDiscovered, isDivergence, isEqualDivergence, isValuePreset, selectedValue))
            .toEqual(COLORS.RED_OPACITY);
        });
      });
    });
  });

  describe('and none of the cases was fulfilled', () => {
    const isRoomDiscovered = true;
    const isDivergence = false;
    const isEqualDivergence = false;
    const isValuePreset = false;
    const selectedValue = 1;

    it('should return WHITE color', () => {
      expect(getListedUserColor(isRoomDiscovered, isDivergence, isEqualDivergence, isValuePreset, selectedValue))
        .toEqual(COLORS.WHITE);
    });
  });
});
