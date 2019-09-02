import * as React from 'react';
import { TouchableHighlight } from 'react-native';
import { ListItem } from 'react-native-elements';
import { JiraProjectModel } from '@core/models';
import { Text } from '@core/styled';
import { ListedProjectIcon } from '../listed-project-icon/listed-project-icon';

interface Props {
  project: JiraProjectModel;
  handleChoose: (project: JiraProjectModel) => void;
}

export const ListedProject = ({ project, handleChoose }: Props) => (
  <TouchableHighlight key={project.id} onPress={() => handleChoose(project)}>
    <ListItem
        title={<Text children={project.displayName} />}
        rightIcon={{ name: 'arrow-forward' }}
        leftElement={<ListedProjectIcon content={project.key} />}
        containerStyle={{ height: 80 }}
    />
  </TouchableHighlight>
);
