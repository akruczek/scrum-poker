import * as React from 'react';
import { Modal, View } from 'react-native';
import { Button } from 'react-native-elements';
import { Text, Container } from '@core/styled';
import { COLORS } from '@core/constants';
import { TRANSLATIONS } from '@core/models';
import { translate } from '@core/services/translations/translate';

interface Props {
  handleYes: () => void;
  handleNo: () => void;
}

export const ResetUserModal = ({ handleYes, handleNo }: Props) => (
  <Modal animationType="fade" transparent>
    <Container justifyContent="center" alignItems="center" alignContent="center" style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}>
      <View style={{ width: 200, height: 130, backgroundColor: COLORS.WHITE, padding: 10, justifyContent: 'space-between' }}>
        <Text align="center" children={translate(TRANSLATIONS.RESET_USERS_MESSAGE)} />
        <Container flexDirection="row" justifyContent="space-around" margins="20px 0 0">
          <Button title="Yes" onPress={handleYes} buttonStyle={{ width: 60 }} />
          <Button title="No" onPress={handleNo} buttonStyle={{ width: 60 }} />
        </Container>
      </View>
    </Container>
  </Modal>
);
