import * as React from 'react';
import * as renderer from 'react-test-renderer';
import * as R from 'ramda';
import { CardButton } from './card-button';
import { Button, colors } from 'react-native-elements';
import { defaultFont } from '../../constants';
import layout from '../../constants/layout';

describe('CardButton', () => {
  const handleSelect = jest.fn();

  describe('when CardButton was mounted with all needed props', () => {
    describe('and fullScreen prop is true', () => {
      const wrapper = renderer.create(
        <CardButton card={{ value: 1, label: '1' }} handleSelect={handleSelect} fullScreen />
      );

      it('should render Button component with specific props and styles based on given fullScreen prop', () => {
        const expectedProps = {
          title: '1',
          buttonStyle: {
            width: layout.window.width,
            height: layout.window.height,
            margin: 0,
            backgroundColor: colors.primary,
          },
          titleStyle: {
            fontSize: 160,
            display: 'flex',
            fontFamily: defaultFont,
          },
          raised: true,
        };

        R.keys(expectedProps).map(key => {
          expect(wrapper.root.findByType(Button).props[key])
            .toEqual(expectedProps[key]);
        });
      });

      it('should call handleSelect prop with given card from props after onPress prop was called', () => {
        renderer.act(() => {
          wrapper.root.findByType(Button).props.onPress();
        });
        
        expect(handleSelect)
          .toHaveBeenCalledWith({ value: 1, label: '1' });
      });
    });

    describe('and fullScreen prop is false', () => {
      const wrapper = renderer.create(
        <CardButton card={{ value: 1, label: '1' }} handleSelect={handleSelect} fullScreen={false} />
      );

      it('should render Button component with specific props and styles based on given fullScreen prop', () => {
        const expectedProps = {
          title: '1',
          buttonStyle: {
            width: 80,
            height: 120,
            margin: 10,
            backgroundColor: colors.primary,
          },
          titleStyle: {
            fontSize: 30,
            display: 'flex',
            fontFamily: defaultFont,
          },
          raised: true,
        };

        R.keys(expectedProps).map(key => {
          expect(wrapper.root.findByType(Button).props[key])
            .toEqual(expectedProps[key]);
        });
      });
    });
  });
});
