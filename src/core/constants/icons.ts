import { Platform } from 'react-native';

export const ICONS = Platform.select({
  android: {
    INFORMATION_CIRCLE: 'md-information-circle',
    LINK: 'md-link',
    OPTIONS: 'md-options',
    CONTACT: 'ios-contact',
    CONTACTS: 'ios-contacts',
  },

  ios: {
    INFORMATION_CIRCLE: 'ios-information-circle',
    LINK: 'ios-link',
    OPTIONS: 'ios-link',
    CONTACT: 'ios-contact',
    CONTACTS: 'ios-contacts',
  },
});
