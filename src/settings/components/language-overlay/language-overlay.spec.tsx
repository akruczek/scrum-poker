import * as React from 'react';
import * as R from 'ramda';
import * as Expo from 'expo';
import renderer, { act } from 'react-test-renderer';
import { Overlay, ListItem, Button } from 'react-native-elements';
import { _LanguageOverlay } from './language-overlay';
import { LANGUAGE_CODES } from '@core/models';

describe('LanguageOverlay', () => {
  const handleClose = jest.fn();
  const setLanguage = jest.fn();
  let isVisible = false;
  let currentLanguage = LANGUAGE_CODES.EN;

  describe('when LanguageOverlay was mounted with all needed props', () => {
    const wrapper = renderer.create(
      <_LanguageOverlay
          handleClose={handleClose}
          setLanguage={setLanguage}
          isVisible={isVisible}
          currentLanguage={currentLanguage}
      />
    );

    it('should render two Overlay components', () => {
      expect(wrapper.root.findAllByType(Overlay).length)
        .toEqual(2);
    });

    it('should render as much ListItem component as LANGUAGE_CODES enum values have', () => {
      expect(wrapper.root.findAllByType(ListItem).length)
        .toEqual(R.values(LANGUAGE_CODES).length);
    });

    describe('and ListItem onPress prop was called', () => {
      const listItemComponents = wrapper.root.findAllByType(ListItem);

      describe('and pressed item language code is the same as current language code', () => {
        beforeEach(() => {
          act(() => {
            listItemComponents[1].props.onPress();
          });
        });

        it('should call handleClose prop', () => {
          expect(handleClose)
            .toHaveBeenCalled();
        });
      });

      describe('and pressed item language code is different than current language code', () => {
        beforeEach(() => {
          act(() => {
            listItemComponents[0].props.onPress();
          });
        });

        it('should call setLanguage prop with selected language', () => {

          expect(setLanguage)
            .toHaveBeenCalledWith(LANGUAGE_CODES.PL);
        });
      });
    });

    describe('and Reload button onPress prop was called', () => {
      beforeEach(() => {
        spyOn(Expo.Updates, 'reload');

        act(() => {
          wrapper.root.findByType(Button).props.onPress();
        });
      });

      it('should call Expo.Updates.reload to reload whole app', () => {
        expect(Expo.Updates.reload)
          .toHaveBeenCalled();
      });
    });

    describe('and onBackdropPress prop was called', () => {
      beforeEach(() => {
        act(() => {
          wrapper.root.findAllByType(Overlay)[0].props.onBackdropPress();
        });
      });

      it('should call handleClose props', () => {

        expect(handleClose)
          .toHaveBeenCalled();
      });
    });

    describe('and isVisible prop equals "true"', () => {
      const wrapper = renderer.create(
        <_LanguageOverlay
            handleClose={handleClose}
            setLanguage={setLanguage}
            currentLanguage={currentLanguage}
            isVisible
        />
      );

      it('should render Overlay component with true as isVisible prop', () => {
        expect(wrapper.root.findAllByType(Overlay)[1].props.isVisible)
          .toBeTruthy();
      });
    });

    describe('and isVisible prop equals "true"', () => {
      const wrapper = renderer.create(
        <_LanguageOverlay
            handleClose={handleClose}
            setLanguage={setLanguage}
            isVisible={false}
            currentLanguage={currentLanguage}
        />
      );

      it('should render Overlay component with false as isVisible prop', () => {
        expect(wrapper.root.findAllByType(Overlay)[1].props.isVisible)
          .toBeFalsy();
      });
    });
  });
});
