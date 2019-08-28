import * as React from 'react';
import renderer from 'react-test-renderer';
import { ProjectsList } from './projects-list';
import { ListedProject } from '../listed-project/listed-project';

describe('ProjectsList', () => {
  const handleChoose = jest.fn();
  const projects: any = [
    { key: 'PROJ-1', id: '1' },
    { key: 'PROJ-2', id: '2' },
    { key: 'PROJ-3', id: '3' },
  ];

  describe('when ProjectsList was mounted with all needed props', () => {
    const wrapper = renderer.create(
      <ProjectsList {...{ projects, handleChoose }} />
    );

    it('should render n+1 ListedProject components (where n is given projects array length)', () => {
      expect(wrapper.root.findAllByType(ListedProject).length)
        .toEqual(4);
    });
  });
});
