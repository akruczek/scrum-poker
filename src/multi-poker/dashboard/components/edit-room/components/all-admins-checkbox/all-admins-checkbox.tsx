import * as React from 'react';
import { ifElse } from '@core/helpers';
import { Checkbox } from '@core/components/checkbox-button/checkbox-button';
import { TRANSLATIONS } from '@core/models';

interface Props {
  isCreating?: boolean;
  setAllAdmins: (value: boolean) => void,
}

export const AllAdminsCheckbox = ({ isCreating, setAllAdmins }: Props) => ifElse(
  isCreating,
  <Checkbox title={TRANSLATIONS.ALL_ADMINS} onChange={setAllAdmins} />,
  null,
);
