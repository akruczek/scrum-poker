import * as React from 'react';
import * as R from 'ramda';
import { Modal } from 'react-native';
import { Container, AppContainer, ScrollContainer } from '@core/styled';
import { TRANSLATIONS, JiraConfigurationModel } from '@core/models';
import { pokers } from '@core/constants';
import { ButtonsSet } from '@core/components';
import { EDIT_ROOMS_TYPES, RoomModel } from '../../../models/room.models';
import { prepareRoomPayload } from '../../helpers/prepare-room-payload/prepare-room-payload.helper';
import { getSettingMethod } from '../../helpers/get-setting-method/get-setting-method.helper';
import { useUpdateRoom } from './hooks/update-room/update-room.hook';
import { PokerButtons } from './components/poker-buttons/poker-buttons';
import { EditRoomForm } from './components/edit-room-form/edit-room-form';
import { AllAdminsCheckbox } from './components/all-admins-checkbox/all-admins-checkbox';
import { JiraConfigurationForm } from './components/jira-configuration-form/jira-configuration-form';

interface Props {
  type: EDIT_ROOMS_TYPES;
  handleSubmit: (payload: any) => void;
  handleDismiss: () => void;
  room?: RoomModel;
  jiraConfiguration?: JiraConfigurationModel;
}

export const EditRoom = ({ type, room, handleSubmit, handleDismiss, jiraConfiguration }: Props) => {
  const [ name, setName ] = React.useState('');
  const [ description, setDescription ] = React.useState('');
  const [ projectKey, setProjectKey ] = React.useState('');
  const [ allAdmins, setAllAdmins ] = React.useState(false);
  const [ poker, setPoker ] = React.useState(pokers[0]);

  const getDefaultConfig = (prop: string) => R.propOr(R.propOr('', prop, jiraConfiguration), prop, room) as any;
  const [ customField, setCustomField ] = React.useState(getDefaultConfig('customField'));
  const [ defaultIssueType, setDefaultIssueType ] = React.useState(getDefaultConfig('defaultIssueType'));
  const [ defaultIssueStatus, setDefaultIssueStatus ] = React.useState(getDefaultConfig('defaultIssueStatus'));

  type State = 'name' | 'description' | 'projectKey' | 'customField' | 'defaultIssueType' | 'defaultIssueStatus';

  useUpdateRoom(type, room)(setName, setDescription, setProjectKey, setAllAdmins, setPoker);

  const handleChange = (field: State, value: string) => {
    getSettingMethod(setName, setDescription, setProjectKey, setCustomField, setDefaultIssueType, setDefaultIssueStatus)(field)(value);
  };

  const handleUpdate = () => {
    handleSubmit(
      prepareRoomPayload(name, description, projectKey, allAdmins, poker, customField, defaultIssueType, defaultIssueStatus),
    );
  };

  const isCreating = R.propEq('CREATE', type, EDIT_ROOMS_TYPES);

  return (
    <Modal animationType="slide">
      <AppContainer>
        <ScrollContainer>
          <Container margins="10px 0">
            <PokerButtons {...{ poker, setPoker }} />
            <EditRoomForm {...{ name, description, projectKey, handleChange }} />
            <JiraConfigurationForm {...{
                customField, setCustomField, isCreating,
                defaultIssueType, setDefaultIssueType,
                defaultIssueStatus, setDefaultIssueStatus }}
            />
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
};
