import { getListedUserColor } from './get-listed-user-color.helper';
import { COLORS } from '@core/constants';

describe('when getListedUserColor was called', () => {
  describe('and room is not discovered', () => {
    const isRoomDiscovered = false;

    describe('and value is not preset', () => {
      const isValuePreset = false;
      const selectedValue = 0;
      const estimations = [ 1, 2 ];

      it('should return WHITE color', () => {
        expect(getListedUserColor(isRoomDiscovered, estimations, selectedValue, isValuePreset))
          .toEqual(COLORS.WHITE);
      });
    });

    describe('and value is present', () => {
      const isValuePreset = true;
      const estimations = [ 1, 2 ];
      const selectedValue = 0;

      it('should return GREEN color', () => {
        expect(getListedUserColor(isRoomDiscovered, estimations, selectedValue, isValuePreset))
        .toEqual(COLORS.GREEN_OPACITY);
      });
    });
  });

  describe('and room is discovered', () => {
    const isRoomDiscovered = true;

    describe('and selectedValue is not a number', () => {
      const selectedValue: any = '?';
      const estimations = [ 1, 2 ];
      const isValuePreset = false;

      it('should return YELLOW_OPACITY color', () => {
        expect(getListedUserColor(isRoomDiscovered, estimations, selectedValue, isValuePreset))
          .toEqual(COLORS.YELLOW_OPACITY);
      });
    });

    describe('and there is divergence', () => {
      const estimations = [ 1, 2, 3];

      describe('and estimated value equals one of divergences', () => {
        const isValuePreset = false;
        const selectedValue = 1;

        it('should return RED_OPACITY color', () => {
          expect(getListedUserColor(isRoomDiscovered, estimations, selectedValue, isValuePreset))
            .toEqual(COLORS.RED_OPACITY);
        });
      });
    });
  });

  describe('and none of the cases was fulfilled', () => {
    const isRoomDiscovered = true;
    const estimations = [ 1, 2 ];
    const isValuePreset = false;
    const selectedValue = 1;

    it('should return WHITE color', () => {
      expect(getListedUserColor(isRoomDiscovered, estimations, selectedValue, isValuePreset))
        .toEqual(COLORS.WHITE);
    });
  });
});
