import * as React from 'react';
import * as R from 'ramda';
import { Modal, TouchableHighlight, View } from 'react-native';
import { ListItem, Button, colors } from 'react-native-elements';
import { connect } from 'react-redux';
import { AppContainer, Container, ScrollContainer } from '@core/styled';
import { JiraIssueModel, TRANSLATIONS } from '@core/models';
import { TextAvatar } from '@core/components/text-avatar/text-avatar';
import { COLORS } from '@core/constants';
import { translate } from '@core/services/translations/translate';
import { Checkbox } from '@core/components/checkbox-button/checkbox-button';
import { isPresent } from '@core/helpers';

interface Props {
  issues: JiraIssueModel[];
  handleChoose: (key: string) => void;
  handleClose: () => void;
}

interface StateProps {
  defaultIssueType: string;
  defaultIssueStatus: string;
}

export const _IssuesList = ({ issues, handleChoose, handleClose, defaultIssueType, defaultIssueStatus }: Props & StateProps) => {
  const [ onlyType, setOnlyType ] = React.useState(true);
  const [ onlyStatus, setOnlyStatus ] = React.useState(true);

  const leftElement = R.ifElse(
    R.isEmpty,
    () => <TextAvatar content="" />,
    (content: string) => <TextAvatar content={content.split('-')[1]} />,
  );

  const filterIssues = R.pipe<JiraIssueModel[], JiraIssueModel[], JiraIssueModel[]>(
    R.when<JiraIssueModel[], JiraIssueModel[]>(
      () => !!(onlyType && isPresent(defaultIssueType)),
      R.filter(R.propEq('issueType', defaultIssueType)),
    ),
    R.when<JiraIssueModel[], JiraIssueModel[]>(
      () => !!(onlyStatus && isPresent(defaultIssueStatus)),
      R.filter(R.propEq('status', defaultIssueStatus)),
    ),
  );

  return (
    <Modal animationType="slide">
      <AppContainer>
        {(isPresent(defaultIssueType) || isPresent(defaultIssueStatus)) && (
          <View style={{ height: 100 }}>
            <Container flexDirection="row" justifyContent="space-around" alignItems="center">
              {isPresent(defaultIssueType) && (
                <Checkbox title={TRANSLATIONS.DEFAULT_TYPE} onChange={setOnlyType} defaultChecked />
              )}
              {isPresent(defaultIssueStatus) && (
                <Checkbox title={TRANSLATIONS.DEFAULT_STATUS} onChange={setOnlyStatus} defaultChecked />
              )}
            </Container>
          </View>
        )}

        <ScrollContainer>
          {filterIssues(issues).map(issue => (
            <TouchableHighlight key={issue.id} onPress={() => handleChoose(issue.key)}>
              <ListItem
                  title={issue.summary}
                  leftElement={leftElement(issue.key)}
              />
            </TouchableHighlight>
          ))}
        </ScrollContainer>
        
        <View style={{ backgroundColor: COLORS.WHITE, paddingTop: 5 }}>
          <Button
              buttonStyle={{ backgroundColor: colors.secondary }}
              onPress={() => handleClose()}
              title={translate(TRANSLATIONS.DISMISS)}
          />
        </View>
      </AppContainer>
    </Modal>
  );
};

const mapStateToProps = R.applySpec<StateProps>({
  defaultIssueType: R.path([ 'rooms', 'model', 'defaultIssueType' ]),
  defaultIssueStatus: R.path([ 'rooms', 'model', 'defaultIssueStatus' ]),
});

export const IssuesList = connect<StateProps, any, any>(
  mapStateToProps, null,
)(_IssuesList);
