import { getEstimation } from './get-estimation.helper';

describe('when getEstimation was called', () => {
  const arr: any = [
    {
      selectedValue: { value: 'A' },
    },
    {
      selectedValue: { value: '1' },
    },
    {
      selectedValue: { value: 19 },
    },
    {
      selectedValue: { value: () => null },
    },
  ];

  it('should map on given array and return only Numbered selectedValue -> value from each', () => {
    const expectedArray = [ 19 ];

    expect(getEstimation(arr))
      .toEqual(expectedArray);
  });
});