import { toggleValue } from './toggle-value.helper';

describe('when toggleValue was called', () => {
  it('should toggle boolean value in given object by given key and optional value', () => {
    const obj = {
      isVisible: false,
    };

    expect(toggleValue('isVisible')(obj))
      .toEqual({ isVisible: true });

    expect(toggleValue('isVisible', false)(obj))
      .toEqual({ isVisible: false });
  });
});
