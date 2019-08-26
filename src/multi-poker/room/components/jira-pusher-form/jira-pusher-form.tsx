import * as React from 'react';
import { Input } from 'react-native-elements';
import { Container, Text, Separator, ViewContainer } from '@core/styled';
import { CardButton, LinkButton } from '@core/components';
import { isPresent } from '@core/helpers';
import { translate } from '@core/services/translations/translate';
import { TRANSLATIONS, PokerCard, JiraIssueModel } from '@core/models';
import { TEXT_SIZES } from '@core/constants';
import { IssuesList } from '../issues-list/issues-list';

interface Props {
  estimationsList: PokerCard[];
  finalEstimation: string;
  issueKey: string;
  issues: JiraIssueModel[];
  setFinalEstimation: (value: string) => void;
  setIssueKey: (value: string) => void;
}

export const JiraPusherForm = ({
  estimationsList, finalEstimation, issueKey, setFinalEstimation, setIssueKey, issues,
}: Props) => {
  const [ isChoosingIssue, chooseIssue ] = React.useState(false);

  const handleChooseIssue = (key: string) => {
    setIssueKey(key);
    chooseIssue(false);
  };

  return (
    <>
      <Container alignItems="center" justifyContent="flex-start" alignContent="flex-start">
        <Text margins="0 0 10px" children={translate(TRANSLATIONS.TYPE_FINAL_ESTIMATION)} />
        <Input
            value={finalEstimation}
            placeholder={translate(TRANSLATIONS.FINAL_ESTIMATION)}
            onChangeText={setFinalEstimation}
            inputStyle={{ textAlign: 'center', fontSize: TEXT_SIZES.BIG }}
        />
        <Separator margin={10} />

        {isPresent(estimationsList) && (
          <>
            <Text margins="0 0 10px" children={translate(TRANSLATIONS.OR_CHOOSE)} />
            <ViewContainer direction="row">
              {estimationsList.map(card => (
                <ViewContainer key={card.value} margins="0 5px">
                  <CardButton card={card} handleSelect={() => setFinalEstimation(String(card.value))} />
                </ViewContainer>
              ))}
            </ViewContainer>
          </>
        )}

        <Separator margin={10} />
        <Text margins="0 0 10px" children={translate(TRANSLATIONS.ISSUE_KEY)} />
        <Input
            value={issueKey}
            placeholder={translate(TRANSLATIONS.JIRA_ISSUE_KEY)}
            onChangeText={setIssueKey}
            inputStyle={{ textAlign: 'center', fontSize: TEXT_SIZES.BIG }}
        />
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
