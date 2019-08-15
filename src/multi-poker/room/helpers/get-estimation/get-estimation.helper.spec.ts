import { getEstimation } from './get-estimation.helper';

describe('when getEstimation was called', () => {
  const room: any = { discovered: true, users: [
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
  ] };

  it('should map on given array and return only Numbered selectedValue -> value from each', () => {
    const expectedArray = [ 19 ];

    expect(getEstimation(room))
      .toEqual(expectedArray);
  });

  it('should return null when room discovered equals "false"', () => {
    const room: any = { discovered: false, users: [
      {
        selectedValue: { value: 'A' },
      },
    ] };

    expect(getEstimation(room))
      .toEqual(null);
  }); 
});