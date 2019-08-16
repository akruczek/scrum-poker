import { getMiddleEstimations } from './get-middle-estimations.helper';

describe('when getMiddleEstimations was called', () => {
  describe('and given array length is greater than 3', () => {
    const array: any = [
      { value: 1, },
      { value: 2, },
      { value: 3, },
      { value: 5, },
      { value: 8, },
    ];

    it('should return 3 middle values of given array', () => {
      const expectedArray = [
        { value: 2, },
        { value: 3, },
        { value: 5, },
      ];

      expect(getMiddleEstimations(array))
        .toEqual(expectedArray);
    });
  });

  describe('and given array length is less or equal than 3', () => {
    const array: any = [
      { value: 1, },
      { value: 2, },
    ];

    it('should return given array', () => {
      expect(getMiddleEstimations(array))
        .toEqual(array);
    });

  });
});
