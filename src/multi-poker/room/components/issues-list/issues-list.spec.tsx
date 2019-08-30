import * as React from 'react';
import renderer from 'react-test-renderer';
import { _IssuesList } from './issues-list';
import { IssuesFilters } from '../issues-filters/issues-filters';
import { ListedIssues } from '../listed-issues/listed-issues';
import { IssuesListButtonsSet } from '../issues-list-buttons-set/issues-list-buttons-set';

describe('IssuesList', () => {
  const issues: any[] = [];
  const handleChoose = jest.fn();
  const handleClose = jest.fn();
  const defaultIssueType = 'Story';
  const defaultIssueStatus = 'To Do';

  describe('when IssuesList was mounted with all needed props', () => {
    const wrapper = renderer.create(
      <_IssuesList {...{ issues, handleChoose, handleClose, defaultIssueStatus, defaultIssueType }} />
    );

    it('should render IssuesFilters component', () => {
      expect(wrapper.root.findByType(IssuesFilters))
        .toBeTruthy();
    });

    it('should render ListedIssues component', () => {
      expect(wrapper.root.findByType(ListedIssues))
        .toBeTruthy();
    });

    it('should render IssuesListButtonsSet component', () => {
      expect(wrapper.root.findByType(IssuesListButtonsSet))
        .toBeTruthy();
    });
  });
});
