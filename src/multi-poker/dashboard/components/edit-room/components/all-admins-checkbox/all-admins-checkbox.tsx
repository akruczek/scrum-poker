import * as React from 'react';
import { ifElse } from '@core/helpers';
import { Checkbox } from '@core/components/checkbox-button/checkbox-button';
import { TRANSLATIONS } from '@core/models';
import { Separator } from '@core/styled';

interface Props {
  isCreating?: boolean;
  setAllAdmins: (value: boolean) => void,
}

export const AllAdminsCheckbox = ({ isCreating, setAllAdmins }: Props) => ifElse(
  isCreating,
  <>
    <Separator margin={20} />
    <Checkbox title={TRANSLATIONS.ALL_ADMINS} onChange={setAllAdmins} />
  </>,
  null,
);
