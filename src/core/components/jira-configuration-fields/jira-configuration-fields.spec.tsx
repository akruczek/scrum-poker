import * as React from 'react';
import renderer from 'react-test-renderer';
import { JiraConfigurationFields } from './jira-configuration-fields';
import { CustomInput } from '../custom-input/custom-input';
import { Separator } from '../../styled';

describe('JiraConfigurationFields', () => {
  const mockedProps = {
    customField: '',
    setCustomField: jest.fn(),
    defaultIssueType: '',
    setDefaultIssueType: jest.fn(),
    defaultIssueStatus: '',
    setDefaultIssueStatus: jest.fn(),
  };

  describe('when JiraConfigurationFields was mounted with all needed props', () => {
    const wrapper = renderer.create(
      <JiraConfigurationFields {...mockedProps} />
    );

    it('should render 3 CustomInput and 2 Separator components', () => {
      expect(wrapper.root.findAllByType(CustomInput).length)
        .toEqual(3);
      expect(wrapper.root.findAllByType(Separator).length)
        .toEqual(2);
    });
  });
});
