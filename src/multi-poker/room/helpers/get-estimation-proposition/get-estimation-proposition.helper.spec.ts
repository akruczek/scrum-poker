import { getEstimationProposition } from './get-estimation-proposition.helper';

describe('when getEstimationProposition was called', () => {
  const users: any = {
    u1: {
      selectedValue: {
        value: 1, label: '1',
      },
    },
    u2: {
      selectedValue: {
        value: 2, label: '2',
      },
    },
    u3: {
      selectedValue: {
        value: 3, label: '3',
      },
    },
    u4: {
      selectedValue: {
        value: 5, label: '5',
      },
    },
    u5: {
      selectedValue: {
        value: 8, label: '8',
      },
    },
  };

  it('should return 3 middle estimations from given users list', () => {
    const expectedResult = [
      { value: 2, label: '2' },
      { value: 3, label: '3' },
      { value: 5, label: '5' },
    ];

    expect(getEstimationProposition(users))
      .toEqual(expectedResult);
  });
});
