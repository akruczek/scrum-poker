import * as React from 'react';
import * as R from 'ramda';
import { View } from 'react-native';
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Separator, Container } from '@core/styled';
import { TRANSLATIONS, JiraProjectModel } from '@core/models';
import { getProjects } from '@core/services/jira/store/jira.actions';
import { LinkButton, CustomInput } from '@core/components';
import { Box } from '@core/styled';
import { ProjectsList } from '../projects-list/projects-list';
import { useGetProjects } from '../../hooks/get-projects/get-projects.hook';

interface Props {
  name: string;
  description: string;
  projectKey: string;
  handleChange: (prop: 'name' | 'description' | 'projectKey', value: string) => void,
}

interface DispatchProps {
  getProjects: () => void;
}

interface StateProps {
  projects: JiraProjectModel[];
}

export const _EditRoomForm = ({
  name, description, projectKey, projects, handleChange, getProjects,
}: Props & DispatchProps & StateProps) => {
  const [ isChoosingProject, chooseProject ] = React.useState(false);

  useGetProjects(getProjects);

  const handleChooseProject = (project: JiraProjectModel) => {
    chooseProject(false);
    handleChange('projectKey', project.key);
    handleChange('name', project.displayName);
  }

  return (
    <>
      <Separator margin={10} />
      <View>
        <Container flexDirection="row">
          <CustomInput
              handleChange={(value: string) => handleChange('name', value)}
              label={TRANSLATIONS.PROJECT_NAME}
              value={name}
              placeholder={TRANSLATIONS.PLACEHOLDER_NAME}
              centered
          />
          <CustomInput
              handleChange={(value: string) => handleChange('projectKey', value)}
              label={TRANSLATIONS.PROJECT_KEY}
              value={projectKey}
              placeholder={TRANSLATIONS.PLACEHOLDER_KEY}
              centered
          />
        </Container>
        <Box top={5}>
          <LinkButton handlePress={() => chooseProject(true)} title={TRANSLATIONS.SELECT_PROJECT_} />
        </Box>
      </View>

      <Separator  margin={10} />
      <CustomInput
          handleChange={(value: string) => handleChange('description', value)}
          label={TRANSLATIONS.ROOM_DESCRIPTION}
          value={description}
          placeholder={TRANSLATIONS.PLACEHOLDER_DESCRIPTION}
          centered
      />
      <Separator margin={20} />

      {isChoosingProject && (
        <ProjectsList projects={projects} handleChoose={handleChooseProject} />
      )}
    </>
  );
};

const mapStateToProps = R.applySpec<StateProps>({
  projects: R.path([ 'jira', 'projects' ]),
});

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(
  { getProjects },
  dispatch,
);

export const EditRoomForm = connect<StateProps, DispatchProps, any>(
  mapStateToProps, mapDispatchToProps,
)(_EditRoomForm);

