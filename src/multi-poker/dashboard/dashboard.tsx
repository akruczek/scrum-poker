import * as React from 'react';
import * as R from 'ramda';
import { ListItem, Divider } from 'react-native-elements';
import { TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { AppContainer } from '../../core/styled/app-container/app-container';
import { ScrollContainer } from '../../core/styled/scroll-container/scroll-container.styled';
import { RoomModel } from '../models/room.models';
import { Firebase } from '../../core/services/firebase/firebase.service';
import { isPresent } from '../../core/helpers/ramda';
import { Preloader } from '../../core/components/preloader/preloader';
import { setRooms } from './store/dashboard.actions';
import { Dispatch, bindActionCreators } from 'redux';

interface DispatchProps {
  setRooms: (rooms: RoomModel[]) => void;
}

interface StateProps {
  rooms: RoomModel[];
}

interface State {
  isPending: boolean;
}

export class _Dashboard extends React.Component<StateProps & DispatchProps, State> {
  constructor(props: StateProps & DispatchProps) {
    super(props);
    this.state = {
      isPending: false,
    };

    this.updateRooms = this.updateRooms.bind(this);
  }

  updateRooms(rooms: RoomModel[]) {
    this.props.setRooms(rooms);
    this.setState({
      isPending: false,
    });
  }

  componentDidMount() {
    this.setState({ isPending: true }, () => {
      Firebase.listen('/rooms', this.updateRooms);
    });
  }

  render() {
    const { rooms } = this.props;
    const { isPending } = this.state;

    return (
      <AppContainer>
        <ScrollContainer>
          {isPresent(rooms) && rooms.map((room: any) => (
            <React.Fragment key={room.id}>
              <TouchableOpacity onPress={() => null}>
                <ListItem
                    title={room.name}
                    subtitle={room.name}
                    rightIcon={{ name: 'arrow-forward' }}
                />
              </TouchableOpacity>
              <Divider />
            </React.Fragment>
          ))}
        </ScrollContainer>

        {isPending && <Preloader />}
      </AppContainer>
    );
  }
}

const mapStateToProps = R.applySpec<StateProps>({
  rooms: R.path([ 'rooms', 'models' ]),
});

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(
  { setRooms },
  dispatch,
);

export const Dashboard = connect<StateProps, DispatchProps, any>(
  mapStateToProps, mapDispatchToProps,
)(_Dashboard);
