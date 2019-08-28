import * as React from 'react';
import * as R from 'ramda';
import { Modal, TouchableHighlight, View } from 'react-native';
import { ListItem, Button, colors } from 'react-native-elements';
import { connect } from 'react-redux';
import { AppContainer, Container, ScrollContainer } from '@core/styled';
import { JiraIssueModel, TRANSLATIONS } from '@core/models';
import { Checkbox } from '@core/components';
import { COLORS } from '@core/constants';
import { translate } from '@core/services/translations/translate';
import { isPresent } from '@core/helpers';
import { useFilterIssues } from '../../hooks/filter-issues/filter-issues.hook';
import { ListedIssueIcon } from '../listed-issue-icon/listed-issue-icon';
import { IssuesFilters } from '../issues-filters/issues-filters';

interface Props {
  issues: JiraIssueModel[];
  handleChoose: (key: string) => void;
  handleClose: () => void;
}

interface StateProps {
  defaultIssueType: string;
  defaultIssueStatus: string;
}

export const _IssuesList = ({
  issues, handleChoose, handleClose, defaultIssueType, defaultIssueStatus
}: Props & StateProps) => {
  const [ setOnlyStatus, setOnlyType, filteredIssues ] = useFilterIssues(defaultIssueType, defaultIssueStatus);

  return (
    <Modal animationType="slide">
      <AppContainer>
        <IssuesFilters {...{ setOnlyStatus, setOnlyType, defaultIssueStatus, defaultIssueType }} />

        <ScrollContainer>
          {filteredIssues(issues).map(issue => (
            <TouchableHighlight key={issue.id} onPress={() => handleChoose(issue.key)}>
              <ListItem
                  title={issue.summary}
                  leftElement={<ListedIssueIcon content={issue.key} />}
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
