import * as React from 'react';
import * as R from 'ramda';
import { Input } from 'react-native-elements';
import { Dispatch, bindActionCreators } from 'redux';
import { Separator } from '@core/styled';
import { translate } from '@core/services/translations/translate';
import { TRANSLATIONS, JiraProjectModel } from '@core/models';
import { getProjects } from '@core/services/jira/store/jira.actions';
import { ProjectsList } from '../projects-list/projects-list';
import { connect } from 'react-redux';
import { useGetProjects } from '../../hooks/get-projects/get-projects.hook';
import { TouchableHighlight } from 'react-native';

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

  const handleChooseProject = (key: string) => {
    chooseProject(false);
    handleChange('projectKey', key);
  }

  return (
    <>
      <Separator margin={10} />
      <Input
          value={name}
          placeholder={translate(TRANSLATIONS.PLACEHOLDER_NAME)}
          onChangeText={(value: string) => handleChange('name', value)}
      />
      <Separator margin={20} />
      <Input
          value={description}
          placeholder={translate(TRANSLATIONS.PLACEHOLDER_DESCRIPTION)}
          onChangeText={(value: string) => handleChange('description', value)}
      />
      <Separator margin={20} />

      <TouchableHighlight onPress={() => chooseProject(true)}>
        <Input
            value={projectKey}
            placeholder={translate(TRANSLATIONS.PROJECT_KEY)}
            editable={false}
            // onChangeText={(value: string) => handleChange('projectKey', value)}
            // onFocus={() => chooseProject(true)}
        />
      </TouchableHighlight>

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

