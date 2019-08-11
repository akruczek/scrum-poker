import * as React from 'react';
import * as R from 'ramda';
import { Modal } from 'react-native';
import { Input, ButtonGroup } from 'react-native-elements';
import { Container, Text, AppContainer, Separator, ScrollContainer } from '@core/styled';
import { translate } from '@core/services/translations/translate';
import { Checkbox } from '@core/components/checkbox-button/checkbox-button';
import { TRANSLATIONS, PokerModel } from '@core/models';
import { TEXT_SIZES, pokers } from '@core/constants';
import { ButtonsSet } from '@core/components/buttons-set/buttons-set';
import { EDIT_ROOMS_TYPES, RoomModel } from '../../../models/room.models';
import { prepareRoomPayload } from '../../helpers/prepare-room-payload/prepare-room-payload.helper';
import { getSettingMethod } from '../../helpers/get-setting-method/get-setting-method.helper';

interface Props {
  type: EDIT_ROOMS_TYPES;
  handleSubmit: (payload: any) => void;
  handleDismiss: () => void;
  room?: RoomModel;
}

export const EditRoom = (props: Props) => {
  const [ name, setName ] = React.useState('');
  const [ description, setDescription ] = React.useState('');
  const [ allAdmins, setAllAdmins ] = React.useState(false);
  const [ poker, setPoker ] = React.useState(pokers[0]);

  React.useEffect(() => {
    if (props.type === EDIT_ROOMS_TYPES.UPDATE && props.room) {
      setName(props.room.name);
      setDescription(props.room.description);
      setAllAdmins(props.room.allAdmins);
      setPoker(props.room.poker);
    }
  }, []);

  const content = {
    title: {
      [EDIT_ROOMS_TYPES.CREATE]: translate(TRANSLATIONS.CREATE_ROOM),
      [EDIT_ROOMS_TYPES.UPDATE]: translate(TRANSLATIONS.UPDATE_ROOM),
    }
  };

  const handleChange = (field: 'name' | 'description', value: string) => {
    getSettingMethod(setName, setDescription)(field)(value);
  };

  const handleSubmit = () => {
    const room = prepareRoomPayload(name, description, allAdmins, poker);
    props.handleSubmit(room);
  };

  const submitButtonTranslation = props.type === EDIT_ROOMS_TYPES.CREATE ? 'CREATE' : 'UPDATE';

  return (
    <Modal animationType="slide">
      <AppContainer>
        <ScrollContainer>
          <Container margins="10px 0">
            <Text size={TEXT_SIZES.BIG}>
              {content.title[props.type]}
            </Text>

            <Separator margin={10} />

            {R.splitEvery(2, pokers).map((buttonsGroup: PokerModel[], index: number) => (
              <ButtonGroup
                  key={buttonsGroup[0].name}
                  buttons={R.map(R.prop('title'), buttonsGroup)}
                  selectedIndex={R.findIndex(R.propEq('name', poker.name))(pokers) - (2 * index)}
                  onPress={groupIndex => setPoker(pokers[groupIndex + (2 * index)])}
                  containerStyle={{ marginRight: 10 }}
              />
            ))}

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
            {props.type === EDIT_ROOMS_TYPES.CREATE && (
              <Checkbox title={TRANSLATIONS.ALL_ADMINS} onChange={setAllAdmins} />
            )}
          </Container>
        </ScrollContainer>
        <ButtonsSet
            titles={[ TRANSLATIONS[submitButtonTranslation], TRANSLATIONS.DISMISS ]}
            onPress={[ handleSubmit, props.handleDismiss ]}
        />
      </AppContainer>
    </Modal>
  );
}
