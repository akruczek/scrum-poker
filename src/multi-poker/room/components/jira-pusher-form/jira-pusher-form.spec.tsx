import * as React from 'react';
import renderer, { act } from 'react-test-renderer';
import { Provider } from 'react-redux';
import { LinkButton } from '@core/components';
import { JiraPusherForm } from './jira-pusher-form';
import { EstimationField } from '../estimation-field/estimation-field';
import { EstimationsList } from '../estimations-list/estimations-list';
import { JiraIssueKeyField } from '../jira-issue-key-field/jira-issue-key-field';
import { IssuesList } from '../issues-list/issues-list';
import { appStore } from '../../../../store/configure-store';

describe('JiraPusherForm', () => {
  const estimationsList: any[] = [];
  const finalEstimation = '1';
  const issueKey = 'OX';
  const issues: any[] = [];
  const setFinalEstimation = jest.fn();
  const setIssueKey = jest.fn();

  describe('when JiraPusherForm was mounted with all needed props', () => {
    const wrapper = renderer.create(
      <Provider store={appStore}>
        <JiraPusherForm {...{
            estimationsList, finalEstimation, issueKey, issues, setFinalEstimation, setIssueKey }}
        />
      </Provider>
    );

    it('should render EstimationField component', () => {
      expect(wrapper.root.findByType(EstimationField))
        .toBeTruthy();
    });

    it('should render EstimationsList component', () => {
      expect(wrapper.root.findByType(EstimationsList))
        .toBeTruthy();
    });

    it('should render JiraIssueKeyField component', () => {
      expect(wrapper.root.findByType(JiraIssueKeyField))
        .toBeTruthy();
    });

    it('should render LinkButton component', () => {
      expect(wrapper.root.findByType(LinkButton))
        .toBeTruthy();
    });

    it('should render IssuesList component after press on LinkButton', () => {
      act(() => {
        wrapper.root.findByType(LinkButton).props.handlePress();
      });

      expect(wrapper.root.findByType(IssuesList))
        .toBeTruthy();
    });

    it('should not render IssuesList component after call IssuesList handleClose prop', () => {
      act(() => {
        wrapper.root.findByType(IssuesList).props.handleClose();
      });

      expect(wrapper.root.findAllByType(IssuesList))
        .toHaveLength(0);
    });
  });
});
