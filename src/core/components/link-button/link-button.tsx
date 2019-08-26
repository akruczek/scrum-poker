import * as React from 'react';
import { Button } from 'react-native-elements';
import { COLORS } from '../../constants';
import { TRANSLATIONS } from '../../models';
import { translate } from '../../services/translations/translate';

interface Props {
  handlePress: () => void;
  title: TRANSLATIONS;
};

export const LinkButton = ({ handlePress, title }: Props) => (
  <Button
      title={translate(title)}
      buttonStyle={{ backgroundColor: COLORS.WHITE }}
      titleStyle={{ color: COLORS.JIRA }}
      onPress={() => handlePress()}
  />
);
