import * as React from 'react';
import renderer from 'react-test-renderer';
import successIcon from '@assets/custom-icons/success.png';
import errorIcon from '@assets/custom-icons/error.png';
import { ActionModal } from './action-modal';
import { TRANSLATIONS } from '../../models';
import { TEXT_SIZES } from '../../constants';
import { Modal } from 'react-native';
import { CustomIcon, Text } from '../../styled';
import { Animatable } from '../animatable/animatable';

describe('ActionModal', () => {
  describe('when ActionModal was mounted with all needed props', () => {
    const wrapper = renderer.create(
      <ActionModal type="success" duration={100} message={TRANSLATIONS.WRONG_EMAIL} textSize={TEXT_SIZES.BIG} />
    );

    it('should render transparent Modal with fade animation type', () => {
      expect(wrapper.root.findByType(Modal).props.animationType)
        .toEqual('fade');
      expect(wrapper.root.findByType(Modal).props.transparent)
        .toBeTruthy();
    });
  });

  describe('when ActionModal was mounted with "success" type prop', () => {
    const wrapper = renderer.create(
      <ActionModal type="success" duration={100} message={TRANSLATIONS.WRONG_EMAIL} textSize={TEXT_SIZES.BIG} />
    );

    it('should render CustomIcon with successIcon source prop', () => {
      expect(wrapper.root.findByType(CustomIcon).props.source)
        .toEqual(successIcon);
    });
  });

  describe('when ActionModal was mounted with "error" type prop', () => {
    const wrapper = renderer.create(
      <ActionModal type="error" duration={100} message={TRANSLATIONS.WRONG_EMAIL} textSize={TEXT_SIZES.BIG} />
    );

    it('should render CustomIcon with errorIcon source prop', () => {
      expect(wrapper.root.findByType(CustomIcon).props.source)
        .toEqual(errorIcon);
    });
  });

  describe('when ActionModal was mounted without "message" prop', () => {
    const wrapper = renderer.create(
      <ActionModal type="success" duration={100} textSize={TEXT_SIZES.BIG} />
    );

    it('should not render Text component', () => {
      expect(wrapper.root.findAllByType(Text).length) 
        .toEqual(0);
    });
  });

  describe('when ActionModal was mounted without "duration" prop', () => {
    const wrapper = renderer.create(
      <ActionModal type="error" message={TRANSLATIONS.WRONG_EMAIL} textSize={TEXT_SIZES.BIG} />
    );

    it('should render Animatable component with 1500 duration prop', () => {
      expect(wrapper.root.findByType(Animatable).props.duration)
        .toEqual(1500);
    });
  });

  describe('when ActionModal was mounted without "textSize" prop, but with message prop', () => {
    const wrapper = renderer.create(
      <ActionModal type="error" duration={100} message={TRANSLATIONS.WRONG_EMAIL} />
    );

    it('should render Text component with TEXT_SIZES.LARGE size prop', () => {
      expect(wrapper.root.findByType(Text).props.size)
        .toEqual(TEXT_SIZES.LARGE);
    });
  });
});
