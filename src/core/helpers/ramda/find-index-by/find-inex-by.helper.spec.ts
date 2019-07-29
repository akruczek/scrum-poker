import { findIndexBy } from './find-index-by.helper';

describe('when findIndexBy was called', () => {
  it('should find in given objects array value by equality of given key', () => {
    const key = 'id';
    const value = '1234';
    const arr = [
      { id: '1111' },
      { id: '2222' },
      { id: '1234' },
    ];

    expect(findIndexBy(key, value)(arr))
      .toEqual(2);
  });
});
