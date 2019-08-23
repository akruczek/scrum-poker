import * as React from 'react';
import * as R from 'ramda';
import { Modal } from 'react-native';
import { Container, Text, AppContainer, ScrollContainer } from '@core/styled';
import { TRANSLATIONS } from '@core/models';
import { TEXT_SIZES, pokers } from '@core/constants';
import { ButtonsSet } from '@core/components/buttons-set/buttons-set';
import { EDIT_ROOMS_TYPES, RoomModel } from '../../../models/room.models';
import { prepareRoomPayload } from '../../helpers/prepare-room-payload/prepare-room-payload.helper';
import { getSettingMethod } from '../../helpers/get-setting-method/get-setting-method.helper';
import { useUpdateRoom } from './hooks/update-room/update-room.hook';
import { getEditRoomContent } from './helpers/get-edit-room-content/get-edit-room-content.helper';
import { PokerButtons } from './components/poker-buttons/poker-buttons';
import { EditRoomForm } from './components/edit-room-form/edit-room-form';
import { AllAdminsCheckbox } from './components/all-admins-checkbox/all-admins-checkbox';

interface Props {
  type: EDIT_ROOMS_TYPES;
  handleSubmit: (payload: any) => void;
  handleDismiss: () => void;
  room?: RoomModel;
}

export const EditRoom = ({ type, room, handleSubmit, handleDismiss }: Props) => {
  const [ name, setName ] = React.useState('');
  const [ description, setDescription ] = React.useState('');
  const [ projectKey, setProjectKey ] = React.useState('');
  const [ allAdmins, setAllAdmins ] = React.useState(false);
  const [ poker, setPoker ] = React.useState(pokers[0]);

  useUpdateRoom(type, room)(setName, setDescription, setProjectKey, setAllAdmins, setPoker);

  const handleChange = (field: 'name' | 'description' | 'projectKey', value: string) => {
    getSettingMethod(setName, setDescription, setProjectKey)(field)(value);
  };

  const handleUpdate = () => {
    handleSubmit(prepareRoomPayload(name, description, projectKey, allAdmins, poker));
  };

  const isCreating = R.propEq('CREATE', type, EDIT_ROOMS_TYPES);

  return (
    <Modal animationType="slide">
      <AppContainer>
        <ScrollContainer>
          <Container margins="10px 0">
            <Text size={TEXT_SIZES.BIG} align="center" children={getEditRoomContent(type)} />
            <PokerButtons {...{ poker, setPoker }} />
            <EditRoomForm {...{ name, description, projectKey, handleChange }} />
            <AllAdminsCheckbox {...{ isCreating, setAllAdmins }} />
          </Container>
        </ScrollContainer>

        <ButtonsSet
            titles={[ TRANSLATIONS[isCreating ? 'CREATE' : 'UPDATE'], TRANSLATIONS.DISMISS ]}
            onPress={[ handleUpdate, handleDismiss ]}
        />
      </AppContainer>
    </Modal>
  );
}
