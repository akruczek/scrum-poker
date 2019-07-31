import standardPokerIcon from '@assets/custom-icons/standard-poker.png';
import fibonacciPokerIcon from '@assets/custom-icons/fibonacci-poker.png';
import tShirtPokerIcon from '@assets/custom-icons/t-shirt-poker.png';
import riskPokerIcon from '@assets/custom-icons/risk-poker.png';
import { CARDS } from './cards';
import { PokerModel } from '../models/poker.models';

export const pokers: PokerModel[] = [
  {
    name: 'Standard',
    title: 'Standard Poker',
    icon: standardPokerIcon,
    description: 'Standard Scrum Poker',
    cards: CARDS.STANDARD_POKER,
  },
  {
    name: 'Fibonacci',
    title: 'Fibonacci Poker',
    icon: fibonacciPokerIcon,
    description: 'Fibonacci Scrum Poker',
    cards: CARDS.FIBONACCI_POKER,
  },
  {
    name: 'T-Shirt',
    title: 'T-Shirt Poker',
    icon: tShirtPokerIcon,
    description: 'T-Shirt Scrum Poker',
    cards: CARDS.T_SHIRT_POKER,
  },
  {
    name: 'Risk',
    title: 'Risk Planning',
    icon: riskPokerIcon,
    description: 'Risk Planning',
    cards: CARDS.RISK_POKER,
  },
];
