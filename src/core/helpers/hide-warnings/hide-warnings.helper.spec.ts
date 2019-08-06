import { hideWarnings } from './hide-warnings.helper';
import { YellowBox } from 'react-native';

describe('when hideWarnings was called', () => {
  beforeEach(() => {
    spyOn(YellowBox, 'ignoreWarnings');
    hideWarnings();
  });

  it('should call YellowBox.ignoreWarnings with "Setting a timer" to hide unnecessary yellow boxes', () => {
    expect(YellowBox.ignoreWarnings)
      .toHaveBeenCalledWith([ 'Setting a timer' ]);
  });
});
