import * as R from 'ramda';

export const getJiraAuthResponse = ({ avatarUrls, accountId, displayName }: {[key: string]: any}) => ({
  accountId, displayName,
  avatarUrl: R.last(R.values(avatarUrls)),
});
