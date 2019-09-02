import * as React from 'react';
import { TouchableHighlight } from 'react-native';
import { ListItem } from 'react-native-elements';
import { ScrollContainer, Text } from '@core/styled';
import { JiraIssueModel } from '@core/models';
import { ListedIssueIcon } from '../listed-issue-icon/listed-issue-icon';

interface Props {
  issues: JiraIssueModel[];
  handleChoose: (issueKey: string) => void;
}

export const ListedIssues = ({ issues, handleChoose }: Props) => (
  <ScrollContainer>
    {issues.map(issue => (
      <TouchableHighlight key={issue.id} onPress={() => handleChoose(issue.key)}>
        <ListItem
            title={<Text children={issue.summary} />}
            leftElement={<ListedIssueIcon content={issue.key} />}
        />
      </TouchableHighlight>
    ))}
  </ScrollContainer>
)
