import { getSettingMethod } from './get-setting-method.helper';

describe('when getSettingMethod was called', () => {
  const setName = jest.fn();
  const setDescription = jest.fn();

  it('should return proper setting method from given methods based on given field name', () => {
    expect(getSettingMethod(setName, setDescription)('name'))
      .toEqual(setName);
  });
});
