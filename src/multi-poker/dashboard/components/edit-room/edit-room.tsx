import * as React from 'react';
import * as R from 'ramda';
import { Modal } from 'react-native';
import { Input, Button, colors } from 'react-native-elements';
import { Container } from '../../../../core/styled/container/container.styled';
import { EDIT_ROOMS_TYPES, RoomModel } from '../../../models/room.models';
import { Text } from '../../../../core/styled/text/text.styled';
import { TEXT_SIZES } from '../../../../core/styled/text/text.model';
import { AppContainer } from '../../../../core/styled/app-container/app-container';
import { Separator } from '../../../../core/styled/separator/separator';

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
      [EDIT_ROOMS_TYPES.CREATE]: 'Create Room',
      [EDIT_ROOMS_TYPES.UPDATE]: 'Update Room',
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
                placeholder="Name"
                onChangeText={(value: string) => this.handleChange('name', value)}
            />
            <Separator margin={20} />
            <Input
                value={this.state.description}
                placeholder="Description"
                onChangeText={(value: string) => this.handleChange('description', value)}
            />
            <Separator margin={20} />
          </Container>

          <Button
              title="CREATE"
              onPress={() => this.handleSubmit()}
          />
          <Separator margin={10} />
          <Button
              title="DISMISS"
              onPress={this.props.handleDismiss}
              buttonStyle={{ backgroundColor: colors.secondary }}
          />
        </AppContainer>
      </Modal>
    );
  }
}
