import * as React from 'react';
import { Modal } from 'react-native';
import { Input, Button, colors } from 'react-native-elements';
import { Container, Text, AppContainer, Separator } from '@core/styled';
import { translate } from '@core/services/translations/translations.service';
import { Checkbox } from '@core/components/checkbox-button/checkbox-button';
import { TRANSLATIONS } from '@core/models';
import { TEXT_SIZES } from '@core/constants';
import { EDIT_ROOMS_TYPES } from '../../../models/room.models';
import { prepareRoomPayload } from '../../helpers/prepare-room-payload/prepare-room-payload.helper';
import { getSettingMethod } from '../../helpers/get-setting-method/get-setting-method.helper';

interface Props {
  type: EDIT_ROOMS_TYPES;
  handleSubmit: (payload: any) => void;
  handleDismiss: () => void;
}

export const EditRoom = (props: Props) => {
  const [ name, setName ] = React.useState('');
  const [ description, setDescription ] = React.useState('');
  const [ allAdmins, setAllAdmins ] = React.useState(false);

  const content = {
    title: {
      [EDIT_ROOMS_TYPES.CREATE]: translate(TRANSLATIONS.CREATE_ROOM),
      [EDIT_ROOMS_TYPES.UPDATE]: translate(TRANSLATIONS.UPDATE_ROOM),
    }
  };

  const handleChange = (field: 'name' | 'description', value: string) => {
    getSettingMethod(setName, setDescription)(field)(value);
  }

  const handleSubmit = () => {
    const room = prepareRoomPayload(name, description, allAdmins);
    props.handleSubmit(room);
  };

  return (
    <Modal animationType="slide">
      <AppContainer>
        <Container margins="10px 0">
          <Text size={TEXT_SIZES.BIG}>
            {content.title[props.type]}
          </Text>

          <Separator margin={10} />
          <Input
              value={name}
              placeholder={translate(TRANSLATIONS.PLACEHOLDER_NAME)}
              onChangeText={(value: string) => handleChange('name', value)}
          />
          <Separator margin={20} />
          <Input
              value={description}
              placeholder={translate(TRANSLATIONS.PLACEHOLDER_DESCRIPTION)}
              onChangeText={(value: string) => handleChange('description', value)}
          />
          <Separator margin={20} />
          {props.type === EDIT_ROOMS_TYPES.CREATE && (
            <Checkbox title={TRANSLATIONS.ALL_ADMINS} onChange={setAllAdmins} />
          )}
        </Container>

        <Button
            title={translate(TRANSLATIONS.CREATE)}
            onPress={() => handleSubmit()}
        />
        <Separator margin={10} />
        <Button
            title={translate(TRANSLATIONS.DISMISS)}
            onPress={props.handleDismiss}
            buttonStyle={{ backgroundColor: colors.secondary }}
        />
      </AppContainer>
    </Modal>
  );
}
