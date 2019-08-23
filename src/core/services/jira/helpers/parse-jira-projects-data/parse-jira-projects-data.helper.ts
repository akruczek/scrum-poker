import * as R from 'ramda';
import { JiraProjectModel } from '../../../../models';

export const parseJiraProjectsData = R.map<any, JiraProjectModel[]>(({ id, key, avatarUrls, name }) => ({
  id, key,
  displayName: name,
  avatarUrl: R.last(R.values(avatarUrls)),
}));
