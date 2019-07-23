import React from 'react';
import * as R from 'ramda';
import { NavigationProps } from '../../core/navigation/navigation.model';
import { PokersList } from '../../single-poker/pokers-list/pokers-list';
import { PokerModel } from '../../core/models/poker.models';

export class SinglePlayer extends React.Component<NavigationProps, {}> {
  static navigationOptions = {
    title: 'Single Player',
  };

  public handleNavigate = (item: PokerModel) => {
    this.props.navigation.navigate(
      'single-poker',
      R.pick([ 'title', 'cards' ], item),
    );
  };

  render() {
    return (
      <PokersList handleNavigate={this.handleNavigate.bind(this)} />
    );
  }
};
