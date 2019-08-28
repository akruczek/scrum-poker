import * as React from 'react';
import { TextAvatar } from '@core/components';
import { ifElse, isPresent } from '@core/helpers';

interface Props {
  content: string;
}

export const ListedProjectIcon = ({ content }: Props) => ifElse(
  isPresent(content),
  <TextAvatar content={content} />,
  <TextAvatar content="" />,
);
