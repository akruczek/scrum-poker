import * as React from 'react';
import renderer from 'react-test-renderer';
import { IssuesFilters } from './issues-filters';
import { Checkbox } from '../../../../core/components';

describe('IssuesFilters', () => {
  const setOnlyType = jest.fn();
  const setOnlyStatus = jest.fn();

  describe('when IssuesFilters was mounted with all needed props', () => {
    describe('and both defaultIssueType and defaultIssueStatus are blank', () => {
      const wrapper = renderer.create(
        <IssuesFilters
            setOnlyType={setOnlyType}
            setOnlyStatus={setOnlyStatus}
            defaultIssueType=""
            defaultIssueStatus=""
        />
      );

      it('should not render any Checkbox component', () => {
        expect(wrapper.root.findAllByType(Checkbox).length)
          .toEqual(0);
      });
    });

    describe('and defaultIssueType or defaultIssueStatus is present', () => {
      const wrapper = renderer.create(
        <IssuesFilters
            setOnlyType={setOnlyType}
            setOnlyStatus={setOnlyStatus}
            defaultIssueType="Task"
            defaultIssueStatus=""
        />
      );

      it('should render one Checkbox component', () => {
        expect(wrapper.root.findAllByType(Checkbox).length)
          .toEqual(1);
      });
    });

    describe('and both defaultIssueType and defaultIssueStatus are present', () => {
      const wrapper = renderer.create(
        <IssuesFilters
            setOnlyType={setOnlyType}
            setOnlyStatus={setOnlyStatus}
            defaultIssueType="Story"
            defaultIssueStatus="Code Review"
        />
      );

      it('should render 2 Checkbox components', () => {
        expect(wrapper.root.findAllByType(Checkbox).length)
          .toEqual(2);
      });
    });
  });
});
