import * as React from 'react';
import * as R from 'ramda';
import { Input } from 'react-native-elements';
import { View } from 'react-native';
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Separator, Text, Container } from '@core/styled';
import { translate } from '@core/services/translations/translate';
import { TRANSLATIONS, JiraProjectModel } from '@core/models';
import { getProjects } from '@core/services/jira/store/jira.actions';
import { LinkButton } from '@core/components/link-button/link-button';
import { TEXT_SIZES } from '@core/constants';
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
          <Container alignItems="center">
            <Text size={TEXT_SIZES.SMALL} children={translate(TRANSLATIONS.PROJECT_KEY)} />
            <Input
                value={name}
                placeholder={translate(TRANSLATIONS.PLACEHOLDER_NAME)}
                onChangeText={(value: string) => handleChange('name', value)}
                inputStyle={{ textAlign: 'center' }}
            />
          </Container>

          <Container alignItems="center">
            <Text size={TEXT_SIZES.SMALL} children={translate(TRANSLATIONS.PROJECT_NAME)} />
            <Input
                value={projectKey}
                placeholder={translate(TRANSLATIONS.PLACEHOLDER_KEY)}
                onChangeText={(value: string) => handleChange('projectKey', value)}
                inputStyle={{ textAlign: 'center' }}
            />
          </Container>
        </Container>
        <LinkButton handlePress={() => chooseProject(true)} title={TRANSLATIONS.SELECT_PROJECT_} />
      </View>

      <Separator />

      <Container alignItems="center" margins="20px 0 0">
        <Text size={TEXT_SIZES.SMALL} children={translate(TRANSLATIONS.ROOM_DESCRIPTION)} />
        <Input
            value={description}
            placeholder={translate(TRANSLATIONS.PLACEHOLDER_DESCRIPTION)}
            onChangeText={(value: string) => handleChange('description', value)}
            inputStyle={{ textAlign: 'center' }}
        />
      </Container>

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

