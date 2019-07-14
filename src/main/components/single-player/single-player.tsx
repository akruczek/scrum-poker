import React from 'react';
import * as R from 'ramda';
import { ScrollContainer } from '../../../core/styled/scroll-container/scroll-container.styled';
import { AppContainer } from '../../../core/styled/app-container/app-container';
import { NavigationProps } from '../../../core/navigation/navigation.model';
import standardPokerIcon from '../../../../assets/custom-icons/standard-poker.png';
import fibonacciPokerIcon from '../../../../assets/custom-icons/fibonacci-poker.png';
import tShirtPokerIcon from '../../../../assets/custom-icons/t-shirt-poker.png';
import riskPokerIcon from '../../../../assets/custom-icons/risk-poker.png';
import { ListItemModel } from './models/list-item.model';
import { ListItem } from './components/list-item/list-item';
import { SCREENS } from '../../../core/navigation/screens';

export class SinglePlayer extends React.Component<NavigationProps, {}> {
  constructor(props: NavigationProps) {
    super(props);
    this.handleNavigate = this.handleNavigate.bind(this);
  }

  static navigationOptions = {
    title: 'Single Player',
  };

  private items = [
    {
      name: 'Standard',
      icon: standardPokerIcon,
      description: 'Standard Scrum Poker'
    },
    {
      name: 'Fibonacci',
      icon: fibonacciPokerIcon,
      description: 'Fibonacci Scrum Poker'
    },
    {
      name: 'T-Shirt',
      icon: tShirtPokerIcon,
      description: 'T-Shirt Scrum Poker',
    },
    {
      name: 'Risk',
      icon: riskPokerIcon,
      description: 'Risk Planning',
    },
  ];

  handleNavigate(name: string) {
    const routeName = `${R.toLower(name)}-poker`;
    console.log(routeName);
    this.props.navigation.navigate(routeName);
  }

  render() {
    return (
      <AppContainer>
        <ScrollContainer>
          {this.items.map((item: ListItemModel) => (
            <ListItem
                key={item.name}
                item={item}
                handlePress={this.handleNavigate}
            />
          ))}
        </ScrollContainer>
      </AppContainer>
    );
  }
}
