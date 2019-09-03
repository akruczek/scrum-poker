import * as React from 'react';
import { Modal } from 'react-native';
import { JiraProjectModel, TRANSLATIONS } from '@core/models';
import { ScrollContainer } from '@core/styled';
import { translate } from '@core/services/translations/translate';
import { StatusBarCover } from '@core/components';
import { ListedProject } from '../listed-project/listed-project';

interface Props {
  projects: JiraProjectModel[];
  handleChoose: (project: JiraProjectModel) => void,
}

export const ProjectsList = ({ projects, handleChoose }: Props) => (
  <Modal animationType="slide">
    <StatusBarCover />
    <ScrollContainer>
      <ListedProject
          project={{ displayName: translate(TRANSLATIONS.NO_PROJECT), key: '' } as JiraProjectModel}
          handleChoose={handleChoose}
      />

      {projects.map(project => (
        <ListedProject key={project.id} {...{ project, handleChoose }} />
      ))}
    </ScrollContainer>
  </Modal>
);
