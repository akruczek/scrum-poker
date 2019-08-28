import * as React from 'react';
import * as R from 'ramda';
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Separator } from '@core/styled';
import { TRANSLATIONS, JiraProjectModel } from '@core/models';
import { getProjects } from '@core/services/jira/store/jira.actions';
import { CustomInput } from '@core/components';
import { ProjectsList } from '../projects-list/projects-list';
import { useGetProjects } from '../../hooks/get-projects/get-projects.hook';
import { EditRoomProjectFields } from '../edit-room-project-fields/edit-room-project-fields';
import { useChooseProject } from '../../hooks/choose-project/choose-project.hook';

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
  useGetProjects(getProjects);
  const [ isChoosingProject, chooseProject, handleChooseProject ] = useChooseProject(handleChange)

  return (
    <>
      <Separator margin={10} />
      <EditRoomProjectFields {...{ name, projectKey, handleChange, chooseProject }}  />

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
        <ProjectsList projects={projects || []} handleChoose={handleChooseProject} />
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
