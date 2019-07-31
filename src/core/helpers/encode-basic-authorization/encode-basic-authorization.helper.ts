import base64 from 'react-native-base64';

export const encodeBasicAuthorization = (before: string, after: string): string =>
  `Basic ${base64.encode([ before, after ].join(':'))}`;