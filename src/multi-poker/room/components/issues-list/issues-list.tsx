import * as React from 'react';
import * as R from 'ramda';
import { Modal } from 'react-native';
import { connect } from 'react-redux';
import { AppContainer } from '@core/styled';
import { JiraIssueModel } from '@core/models';
import { useFilterIssues } from '../../hooks/filter-issues/filter-issues.hook';
import { IssuesFilters } from '../issues-filters/issues-filters';
import { ListedIssues } from '../listed-issues/listed-issues';
import { IssuesListButtonsSet } from '../issues-list-buttons-set/issues-list-buttons-set';

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
        <ListedIssues issues={filteredIssues(issues)} handleChoose={handleChoose} />
        <IssuesListButtonsSet handleClose={handleClose} />
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
