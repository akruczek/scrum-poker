import { hideWarnings, _console } from './hide-warnings.helper';
import { YellowBox } from 'react-native';

describe('when hideWarnings was called', () => {
  beforeEach(() => {
    spyOn(YellowBox, 'ignoreWarnings');
    spyOn(_console, 'warn');
    spyOn(console, 'warn');
    hideWarnings();
  });

  it('should call YellowBox.ignoreWarnings with "Setting a timer" to hide unnecessary yellow boxes', () => {
    expect(YellowBox.ignoreWarnings)
      .toHaveBeenCalledWith([ 'Setting a timer' ]);
  });

  it('should call console.warn when it was called with no "Setting a timer" warning', () => {
    console.warn('WARNING!');

    expect(_console.warn)
      .toHaveBeenCalled();
  });

  it('should not call console.warn when it was called with "Setting a timer"', () => {
    console.warn('Setting a timer');

    expect(_console.warn)
      .not.toHaveBeenCalled();
  });
});
