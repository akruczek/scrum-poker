import * as React from 'react';
import * as R from 'ramda';
import { Modal, TouchableHighlight } from 'react-native';
import { ListItem } from 'react-native-elements';
import { JiraProjectModel, TRANSLATIONS } from '@core/models';
import { ScrollContainer } from '@core/styled';
import { translate } from '@core/services/translations/translate';
import { TextAvatar } from '@core/components/text-avatar/text-avatar';

interface Props {
  projects: JiraProjectModel[];
  handleChoose: (project: JiraProjectModel) => void,
}

export const ProjectsList = ({ projects, handleChoose }: Props) => {
  const leftElement = R.ifElse(
    R.isEmpty,
    () => <TextAvatar content="" />,
    (content: string) => <TextAvatar content={content} />,
  );

  return (
    <Modal animationType="slide">
      <ScrollContainer>
        <TouchableHighlight onPress={() => handleChoose({ displayName: '', key: '' } as any)}>
          <ListItem
              title={translate(TRANSLATIONS.NO_PROJECT)}
              rightIcon={{ name: 'arrow-forward' }}
              leftElement={leftElement('')}
              containerStyle={{ height: 80 }}
          />
        </TouchableHighlight>

        {projects.map(project => (
          <TouchableHighlight key={project.id} onPress={() => handleChoose(project)}>
            <ListItem
                title={project.displayName}
                rightIcon={{ name: 'arrow-forward' }}
                leftElement={leftElement(project.key)}
                containerStyle={{ height: 80 }}
            />
          </TouchableHighlight>
        ))}
      </ScrollContainer>
    </Modal>
  );
};
