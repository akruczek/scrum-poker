import * as React from 'react';
import * as R from 'ramda';
import { Modal } from 'react-native';
import { Input, Button, colors } from 'react-native-elements';
import { Container, Text, AppContainer, Separator } from '@core/styled';
import { translate } from '@core/services/translations/translations.service';
import { TRANSLATIONS } from '@core/models';
import { TEXT_SIZES } from '@core/constants';
import { EDIT_ROOMS_TYPES, RoomModel } from '../../../models/room.models';

interface Props {
  type: EDIT_ROOMS_TYPES;
  room: RoomModel;
  handleSubmit: (room: any) => void;
  handleDismiss: () => void;
}

interface State {
  name: string;
  description: string;
}

export class EditRoom extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      name: '',
      description: '',
    };
  }

  private content = {
    title: {
      [EDIT_ROOMS_TYPES.CREATE]: translate(TRANSLATIONS.CREATE_ROOM),
      [EDIT_ROOMS_TYPES.UPDATE]: translate(TRANSLATIONS.UPDATE_ROOM),
    }
  };

  private handleChange(field: string, value: string) {
    this.setState({ [field]: value } as {});
  }

  private handleSubmit() {
    this.props.handleSubmit({
      ...R.pick([ 'name', 'description' ], this.state),
      users: [],
      discovered: false,
    });
  }

  render() {
    const { type } = this.props;

    return (
      <Modal animationType="slide">
        <AppContainer>
          <Container margins="10px 0">
            <Text size={TEXT_SIZES.BIG}>
              {this.content.title[type]}
            </Text>

            <Separator margin={10} />
            <Input
                value={this.state.name}
                placeholder={translate(TRANSLATIONS.PLACEHOLDER_NAME)}
                onChangeText={(value: string) => this.handleChange('name', value)}
            />
            <Separator margin={20} />
            <Input
                value={this.state.description}
                placeholder={translate(TRANSLATIONS.PLACEHOLDER_DESCRIPTION)}
                onChangeText={(value: string) => this.handleChange('description', value)}
            />
            <Separator margin={20} />
          </Container>

          <Button
              title={translate(TRANSLATIONS.CREATE)}
              onPress={() => this.handleSubmit()}
          />
          <Separator margin={10} />
          <Button
              title={translate(TRANSLATIONS.DISMISS)}
              onPress={this.props.handleDismiss}
              buttonStyle={{ backgroundColor: colors.secondary }}
          />
        </AppContainer>
      </Modal>
    );
  }
}
