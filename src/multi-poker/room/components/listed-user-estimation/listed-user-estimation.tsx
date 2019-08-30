import * as React from 'react';
import { ifElse } from '@core/helpers';
import { CardIcon } from '@core/components';
import { ListedUserIcon } from '../listed-user-icon/listed-user-icon';

interface Props {
  isValuePresent: boolean;
  isRoomDiscovered: boolean;
  isCurrentUser: boolean;
  selectedLabel: string;
  selectedValue: number;
  handlePress: (value: string | number) => void;
  icon: string;
}

export const ListedUserEstimation = ({
  isValuePresent, isRoomDiscovered, isCurrentUser, selectedLabel, selectedValue, handlePress, icon,
}: Props) => ifElse(
  (isValuePresent && isRoomDiscovered) || (isValuePresent && isCurrentUser),
  <CardIcon label={selectedLabel} value={selectedValue} handlePress={handlePress} />,
  <ListedUserIcon isCurrentUser={isCurrentUser} icon={icon} />,
);
