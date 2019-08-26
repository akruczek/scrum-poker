import * as React from 'react';
import renderer from 'react-test-renderer';

const TestHook = ({ callback }: any) => {
  callback();
  return null;
};

export const testHook = (callback: any) => {
  renderer.create(<TestHook callback={callback} />);
};
