import * as React from 'react';
import * as R from 'ramda';
import { Modal } from 'react-native';
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Avatar, Button } from 'react-native-elements';
import { Text, Separator, Container, ScrollContainer, AppContainer } from '@core/styled';
import { TEXT_SIZES } from '@core/constants';
import { JiraUserModel, TRANSLATIONS } from '@core/models';
import { ButtonsSet } from '@core/components/buttons-set/buttons-set';
import { jiraSignOut } from '@core/services/jira/store/jira.actions';
import { translate } from '@core/services/translations/translate';

interface Props {
  jiraUser: JiraUserModel;
  handleClose: () => void;
}

interface DispatchProps {
  jiraSignOut: () => void;
}

export const _JiraConfig = ({
  jiraUser, handleClose, jiraSignOut,
}: Props & DispatchProps) => {
  const handleLogout = () => {
    jiraSignOut();
    handleClose();
  };

  return (
    <Modal animationType="slide">
      <AppContainer>
        <ScrollContainer>
          <Text size={TEXT_SIZES.BIG} margins="10px 0 0" align="center">
            {translate(TRANSLATIONS.JIRA_CONFIGURATION)}
          </Text>
          <Separator margin={10} />
          <Container flexDirection="row" alignItems="center">
            <Container flexDirection="row" justifyContent="flex-start">
              <Avatar source={{ uri: jiraUser.avatarUrl }} rounded />
              <Text margins="0 0 0 10px" children={jiraUser.displayName} />
            </Container>
            <Container flexDirection="row" justifyContent="flex-end">
              <Button
                  title={translate(TRANSLATIONS.LOGOUT)}
                  icon={{ name: 'exit-to-app', color: 'white' }}
                  onPress={handleLogout}
              />
            </Container>
          </Container>
          <Separator margin={10} />
        </ScrollContainer>

        <ButtonsSet
            titles={[ TRANSLATIONS.APPLY, TRANSLATIONS.DISMISS ]}
            onPress={[ () => null, handleClose ]}
        />
      </AppContainer>
    </Modal>
  );
};

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(
  { jiraSignOut },
  dispatch,
);

export const JiraConfig = connect<{}, DispatchProps, Props>(
  null, mapDispatchToProps,
)(_JiraConfig);

