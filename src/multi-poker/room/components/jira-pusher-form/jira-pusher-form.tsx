import * as React from 'react';
import { Container } from '@core/styled';
import { LinkButton } from '@core/components';
import { TRANSLATIONS, PokerCard, JiraIssueModel } from '@core/models';
import { IssuesList } from '../issues-list/issues-list';
import { useChooseIssue } from '../../hooks/choose-issue/choose-issue.hook';
import { EstimationsList } from '../estimations-list/estimations-list';
import { EstimationField } from '../estimation-field/estimation-field';
import { JiraIssueKeyField } from '../jira-issue-key-field/jira-issue-key-field';

interface Props {
  estimationsList: PokerCard[];
  finalEstimation: string;
  issueKey: string;
  issues: JiraIssueModel[];
  setFinalEstimation: (value: string) => void;
  setIssueKey: (value: string) => void;
}2

export const JiraPusherForm = ({
  estimationsList, finalEstimation, issueKey, setFinalEstimation, setIssueKey, issues,
}: Props) => {
  const [ isChoosingIssue, chooseIssue, handleChooseIssue ] = useChooseIssue(setIssueKey);

  return (
    <>
      <Container alignItems="center" justifyContent="flex-start" alignContent="flex-start">
        <EstimationField {...{ finalEstimation, setFinalEstimation }} />
        <EstimationsList {...{ estimationsList, setFinalEstimation }} />
        <JiraIssueKeyField {...{ issueKey, setIssueKey }} />
        <LinkButton handlePress={() => chooseIssue(true)} title={TRANSLATIONS.SELECT_ISSUE_} />
      </Container>
      
      {isChoosingIssue && (
        <IssuesList
            issues={issues}
            handleChoose={handleChooseIssue}
            handleClose={() => chooseIssue(false)}
        />
      )}
    </>
  );
};
