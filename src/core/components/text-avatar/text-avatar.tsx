import * as React from 'react';
import * as R from 'ramda';
import { Text } from '@core/styled';
import { AvatarContainer } from '@core/styled/avatar-container/avatar-container.styled';
import { TEXT_SIZES } from '@core/constants';
import { _cond } from '../../helpers';

interface Props {
  content: string;
}

export const TextAvatar = ({ content }: Props) => {
  const textSize = _cond(
    content.length > 5, TEXT_SIZES.TINY,
    content.length > 3, TEXT_SIZES.SMALL,
    R.T, TEXT_SIZES.REGULAR
  )

  return (
    <AvatarContainer>
      <Text align="center" size={textSize}>
        {content}
      </Text>
    </AvatarContainer>
  );
};
