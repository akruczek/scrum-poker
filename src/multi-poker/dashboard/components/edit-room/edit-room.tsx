import * as React from 'react';
import * as R from 'ramda';
import { Modal } from 'react-native';
import { Container, AppContainer, ScrollContainer } from '@core/styled';
import { TRANSLATIONS, JiraConfigurationModel, EDIT_ROOMS_TYPES, RoomModel } from '@core/models';
import { ButtonsSet, StatusBarCover } from '@core/components';
import { prepareRoomPayload } from '../../helpers/prepare-room-payload/prepare-room-payload.helper';
import { getSettingMethod } from '../../helpers/get-setting-method/get-setting-method.helper';
import { useUpdateRoom } from './hooks/update-room/update-room.hook';
import { PokerButtons } from './components/poker-buttons/poker-buttons';
import { EditRoomForm } from './components/edit-room-form/edit-room-form';
import { AllAdminsCheckbox } from './components/all-admins-checkbox/all-admins-checkbox';
import { JiraConfigurationForm } from './components/jira-configuration-form/jira-configuration-form';
import { useGetJiraConfiguration } from './hooks/get-jira-configuration/get-jira-configuration.hook';
import { useUpdateForm } from './hooks/update-form/update-form.hook';
import { ResetUsers } from './components/reset-users/reset-users';
import { ResetUserModal } from './components/reset-users-modal/reset-users-modal';

interface Props {
  type: EDIT_ROOMS_TYPES;
  handleSubmit: (payload: any) => void;
  handleDismiss: () => void;
  room?: RoomModel;
  jiraConfiguration?: JiraConfigurationModel;
}

type State = 'name' | 'description' | 'projectKey' | 'customField' | 'defaultIssueType' | 'defaultIssueStatus';

export const EditRoom = ({ type, room, handleSubmit, handleDismiss, jiraConfiguration }: Props) => {
  const [ isResetUsers, setResetUsers ] = React.useState(false);

  const [
    name, description, projectKey, allAdmins, poker,
    setName, setDescription, setProjectKey, setAllAdmins, setPoker,
  ] = useUpdateForm();

  const [
    customField, setCustomField, defaultIssueType, setDefaultIssueType, defaultIssueStatus, setDefaultIssueStatus,
  ] = useGetJiraConfiguration(room, jiraConfiguration);

  useUpdateRoom(type, room)(setName, setDescription, setProjectKey, setAllAdmins, setPoker,);

  const handleChange = (field: State, value: string) => {
    getSettingMethod(setName, setDescription, setProjectKey, setCustomField, setDefaultIssueType, setDefaultIssueStatus)(field)(value);
  };

  const handleUpdate = () => {
    handleSubmit(
      prepareRoomPayload(name, description, projectKey, allAdmins, poker, customField, defaultIssueType, defaultIssueStatus),
    );
  };

  const handleReset = () => {
    // TODO: reset users
    console.log('reset users');
  };

  const isCreating = R.propEq('CREATE', type, EDIT_ROOMS_TYPES);

  return (
    <Modal animationType="slide">
      <StatusBarCover />
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
            <ResetUsers {...{ isCreating, setResetUsers }} />
          </Container>
        </ScrollContainer>

        <ButtonsSet
            titles={[ TRANSLATIONS[isCreating ? 'CREATE' : 'UPDATE'], TRANSLATIONS.DISMISS ]}
            onPress={[ handleUpdate, handleDismiss ]}
        />
      </AppContainer>

      {isResetUsers && (
        <ResetUserModal handleYes={handleReset} handleNo={() => setResetUsers(false)} />
      )}
    </Modal>
  );
};
