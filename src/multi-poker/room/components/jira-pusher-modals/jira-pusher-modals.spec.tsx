import * as React from 'react';
import renderer from 'react-test-renderer';
import { JiraPusherModals } from './jira-pusher-modals';
import { Preloader, ActionModal } from '../../../../core/components';

describe('JiraPusherModals', () => {
  describe('when JiraPusherModals was mounted with all needed props', () => {
    describe('and given "isPending" prop is truthy', () => {
      const wrapper = renderer.create(
        <JiraPusherModals displaySuccess={false} displayError={false} isPending />
      );

      it('should render Preloader component', () => {
        expect(wrapper.root.findByType(Preloader))
          .toBeTruthy();
      });
    });

    describe('and given "displaySuccess" prop is truthy', () => {
      const wrapper = renderer.create(
        <JiraPusherModals displayError={false} isPending={false} displaySuccess />
      );

      it('should render ActionModal with type "success" component', () => {
        expect(wrapper.root.findByType(ActionModal))
          .toBeTruthy();
        expect(wrapper.root.findByType(ActionModal).props.type)
          .toEqual('success');
      });
    });

    describe('and given "displayError" prop is truthy', () => {
      const wrapper = renderer.create(
        <JiraPusherModals isPending={false} displaySuccess={false} displayError />
      );

      it('should render ActionModal with type "error" component', () => {
        expect(wrapper.root.findByType(ActionModal))
          .toBeTruthy();
        expect(wrapper.root.findByType(ActionModal).props.type)
          .toEqual('error');
      });
    });

    describe('and no one from given props is truthy', () => {
      const wrapper = renderer.create(
        <JiraPusherModals isPending={false} displaySuccess={false} displayError={false} />
      );

      it('should render null', () => {
        expect(wrapper.root.props.children)
          .toBeFalsy();
      });
    });
  });
});
