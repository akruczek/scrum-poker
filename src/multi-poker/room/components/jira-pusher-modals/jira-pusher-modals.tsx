import * as React from 'react';
import * as R from 'ramda';
import { _cond } from '@core/helpers';
import { TRANSLATIONS } from '@core/models';
import { TEXT_SIZES } from '@core/constants';
import { Preloader, ActionModal } from '@core/components';

interface Props {
  isPending: boolean;
  displaySuccess: boolean;
  displayError: boolean;
}

export const JiraPusherModals = ({ isPending, displaySuccess, displayError }: Props) => _cond(
  isPending, (
    <Preloader />
  ),
  displaySuccess, (
    <ActionModal type="success" message={TRANSLATIONS.JIRA_PUSH_SUCCESS} />
  ),
  displayError, (
    <ActionModal type="error" message={TRANSLATIONS.JIRA_PUSH_ERROR} textSize={TEXT_SIZES.BIG} />
  ),
  R.T, null,
);
