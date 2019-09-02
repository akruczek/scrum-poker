import * as React from 'react';
import * as R from 'ramda';
import renderer from 'react-test-renderer';
import { Input } from 'react-native-elements';
import { defaultFont } from '@core/constants';
import { JiraLoginInput } from './jira-login-input';

describe('JiraLoginInput', () => {
  describe('when JiraLoginInput was mounted with all needed props', () => {
    const props = {
      placeholder: 'PLACEHOLDER',
      onChange: jest.fn(),
      value: 'hello',
      isSecure: true,
      autoCapitalize: 'none',
      autoCorrect: false,
      inputStyle: {
        fontFamily: defaultFont,
      },
    }
    const wrapper = renderer.create(<JiraLoginInput {...props} />);

    it('should render Input component with all props passed', () => {
      const expectedProps = R.zipObj(
        [ 'placeholder', 'onChangeText', 'value', 'secureTextEntry', 'autoCapitalize', 'autoCorrect', 'inputStyle' ],
        R.values(props),
      );

      expect(wrapper.root.findByType(Input).props)
        .toEqual(expectedProps);
    });
  });
});
