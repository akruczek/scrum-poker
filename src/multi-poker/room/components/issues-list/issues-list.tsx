import * as React from 'react';
import * as R from 'ramda';
import { Modal, TouchableHighlight, View } from 'react-native';
import { ListItem, Button, colors } from 'react-native-elements';
import { AppContainer, Container, ScrollContainer } from '@core/styled';
import { JiraIssueModel, TRANSLATIONS } from '@core/models';
import { TextAvatar } from '@core/components/text-avatar/text-avatar';
import { COLORS } from '@core/constants';
import { translate } from '@core/services/translations/translate';
import { Checkbox } from '@core/components/checkbox-button/checkbox-button';

interface Props {
  issues: JiraIssueModel[];
  handleChoose: (key: string) => void;
  handleClose: () => void;
}

// TODO: filter by "userStoryOnly" and "hideDone"
export const IssuesList = ({ issues, handleChoose, handleClose }: Props) => {
  const [ userStoryOnly, setUserStoryOnly ] = React.useState(true);
  const [ hideDone, setHideDone ] = React.useState(true);

  const leftElement = R.ifElse(
    R.isEmpty,
    () => <TextAvatar content="" />,
    (content: string) => <TextAvatar content={content.split('-')[1]} />,
  );

  return (
    <Modal animationType="slide">
      <AppContainer>
        <View style={{ height: 100 }}>
          <Container flexDirection="row" justifyContent="space-around" alignItems="center">
            <Checkbox title={TRANSLATIONS.USER_STORY_ONLY} onChange={setUserStoryOnly} defaultChecked />
            <Checkbox title={TRANSLATIONS.HIDE_DONE} onChange={setHideDone} defaultChecked />
          </Container>
        </View>

        <ScrollContainer>
          {issues.map(issue => (
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
