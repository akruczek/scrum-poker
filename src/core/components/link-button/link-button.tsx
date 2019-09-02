import * as React from 'react';
import { Button } from 'react-native-elements';
import { COLORS, defaultFont } from '../../constants';
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
      titleStyle={{ color: COLORS.JIRA, fontFamily: defaultFont }}
      onPress={() => handlePress()}
  />
);
