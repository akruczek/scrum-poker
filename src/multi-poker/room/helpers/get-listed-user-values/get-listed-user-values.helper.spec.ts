import { getListedUserValues } from './get-listed-user-values.helper';

describe('when getListedUserValues was called', () => {
  const user: any = {
    selectedValue: {
      value: 1,
      label: '1',
    },
  };

  it('should return given user selectedValue value and label', () => {
    expect(getListedUserValues(user))
      .toEqual([ 1, '1' ]);
  });
});
