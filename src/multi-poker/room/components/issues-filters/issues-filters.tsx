import * as React from 'react';
import * as R from 'ramda';
import { View } from 'react-native';
import { ifElse, isPresent } from '@core/helpers';
import { Container } from '@core/styled';
import { Checkbox } from '@core/components';
import { TRANSLATIONS } from '@core/models';

interface Props {
  defaultIssueType: string;
  defaultIssueStatus: string;
  setOnlyType: (value: boolean) => void,
  setOnlyStatus: (value: boolean) => void,
}

export const IssuesFilters = ({
  defaultIssueType, defaultIssueStatus, setOnlyType, setOnlyStatus
}: Props) => ifElse(
  R.any(isPresent, [ defaultIssueType, defaultIssueStatus ]),
  <View style={{ height: 100 }}>
    <Container flexDirection="row" justifyContent="space-around" alignItems="center">
      {isPresent(defaultIssueType) && (
        <Checkbox title={TRANSLATIONS.DEFAULT_TYPE} onChange={setOnlyType} defaultChecked />
      )}
      {isPresent(defaultIssueStatus) && (
        <Checkbox title={TRANSLATIONS.DEFAULT_STATUS} onChange={setOnlyStatus} defaultChecked />
      )}
    </Container>
  </View>,
  null,
);
