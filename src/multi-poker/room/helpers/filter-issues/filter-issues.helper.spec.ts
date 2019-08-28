import { filterIssues } from './filter-issues.helper';

describe('when filterIssues was called', () => {
  const mockedIssues = [
    {
      id: '1234',
      key: 'k-1234',
      createdAt: '10:10',
      summary: 'As a Scrum Master I want couch you',
      status: 'To Do',
      issueType: 'Other Task',
    },
    {
      id: '1235',
      key: 'k-1235',
      createdAt: '10:11',
      summary: 'As a Developer I want program a program',
      status: 'To Code',
      issueType: 'Story',
    },
    {
      id: '1236',
      key: 'k-1236',
      createdAt: '10:12',
      summary: 'As a PO I want to have Product',
      status: 'To Do',
      issueType: 'Story',
    },
    {
      id: '1237',
      key: 'k-1237',
      createdAt: '10:13',
      summary: 'As a QA I want test it',
      status: 'Failed',
      issueType: 'Test Run',
    },
  ];

  describe('and "onlyType" is truthy', () => {
    it('should filter given issues by given issue type', () => {
      const expectedIssues = [ mockedIssues[1], mockedIssues[2] ];

      expect(filterIssues(true, false, 'Story', 'To Do')(mockedIssues))
        .toEqual(expectedIssues);
    });
  });

  describe('and "onlyType" is falsy', () => {
    it('should not filter given issues by given issue type', () => {
      expect(filterIssues(false, false, 'Story', 'To Do')(mockedIssues))
        .toEqual(mockedIssues);
    });
  });

  describe('and "onlyStatus" is truthy', () => {
    it('should filter given issues by given issue status', () => {
      const expectedIssues = [ mockedIssues[0], mockedIssues[2] ];

      expect(filterIssues(false, true, 'Bug', 'To Do')(mockedIssues))
        .toEqual(expectedIssues)
    });
  });

  describe('and "onlyStatus" is falsy', () => {
    it('should not filter given issues byb given issue status', () => {
      expect(filterIssues(false, false, 'Bug', 'To Code')(mockedIssues))
        .toEqual(mockedIssues);
    });
  });
});
