import * as React from 'react';
import { Modal, ImageSourcePropType, View } from 'react-native';
import successIcon from '@assets/custom-icons/success.png';
import errorIcon from '@assets/custom-icons/error.png';
import { Container, CustomIcon, Text } from '../../styled';
import { Animatable } from '../animatable/animatable';
import { BOUNCING_ENTRANCES, TRANSLATIONS } from '../../models';
import { translate } from '../../services/translations/translations.service';
import { TEXT_SIZES, colors } from '../../constants';

interface Props {
  type: 'success' | 'error';
  duration?: number;
  message?: TRANSLATIONS;
  textSize?: TEXT_SIZES;
}

export const ActionModal = ({ type, duration, message, textSize }: Props) => {
  const icon: { [key: string]: ImageSourcePropType } = {
    success: successIcon,
    error: errorIcon,
  }

  return (
    <Modal animationType="fade" transparent={true}>
      <Container justifyContent="center" alignItems="center" alignContent="center" style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}>
        <Animatable animation={BOUNCING_ENTRANCES.BOUNCE_IN} iterationCount={1} duration={duration || 1500}>
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <CustomIcon size={256} source={icon[type]} />
          </View>

          {message && (
            <Text align="center" size={textSize || TEXT_SIZES.LARGE} style={{ color: colors.white }}>
              {translate(message)}
            </Text>
          )}
        </Animatable>
      </Container>
    </Modal>
  );
};
