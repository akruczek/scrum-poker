import * as React from 'react';
import { Text } from '@core/styled';
import { AvatarContainer } from '@core/styled/avatar-container/avatar-container.styled';
import { TEXT_SIZES } from '../../../../../../core/constants';

interface Props {
  content: string;
}

export const ProjectAvatar = ({ content }: Props) => {
  const isKeyLong = content.length > 3;

  return (
    <AvatarContainer>
      <Text align="center" size={isKeyLong ? TEXT_SIZES.SMALL : TEXT_SIZES.REGULAR}>
        {content}
      </Text>
    </AvatarContainer>
  );
};
