import * as React from 'react';
import { NavigationScreenProp } from 'react-navigation';

type ReturnType = [
  boolean,
  (value: boolean) => void,
];

export const useToggleOverlay = (
  navigation: NavigationScreenProp<any, any>
): ReturnType => {
  const [ isSelectingLanguage, toggleOverlay ] = React.useState(false);

  React.useEffect(() => {
    navigation.setParams({ toggleOverlay });
  }, []);

  return [ isSelectingLanguage, toggleOverlay ];
};
