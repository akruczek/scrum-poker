import * as React from 'react';
import * as R from 'ramda';
import { ifElse } from '@core/helpers';
import { TextAvatar } from '@core/components';

interface Props {
  content: string;
}

export const ListedIssueIcon = ({ content }: Props) => ifElse(
  R.isEmpty(content),
  <TextAvatar content="" />,
  <TextAvatar content={content.split('-')[1]} />,
);
