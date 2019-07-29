import { rejectNil } from './reject-nil.helper';

describe('when rejectNil was called', () => {
  it('should reject nil values in given array', () => {
    const arr1 = [
      null,
      1,
      'asd',
      undefined,
    ];
    const arr2 = [ 'A', 'B', 'C' ];
    const arr3: [] = [];

    expect(rejectNil(arr1))
      .toEqual([ 1, 'asd' ]);

    expect(rejectNil(arr2))
      .toEqual(arr2);
    
    expect(rejectNil(arr3))
      .toEqual([]);
  });
});
