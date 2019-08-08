import * as React from 'react';
import * as R from 'ramda';
import { MainTabNavigator } from './main.navigation';

describe('Main Navigation', () => {
  it('should have 3 navigation routes', () => {
    expect(R.values((MainTabNavigator as any).router.childRouters).length)
      .toEqual(3);
  });

  it('each navigation route should have one navigation route', () => {
    R.values((MainTabNavigator as any).router.childRouters).map(route => {
      expect(R.values(route.childRouters).length)
        .toEqual(1);
    });
  });
});
