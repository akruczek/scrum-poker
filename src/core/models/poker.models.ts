import { ImageSourcePropType } from 'react-native';
import { CARDS } from '../constants/cards';

export interface PokerModel {
  name: string;
  title: string;
  description: string;
  icon: ImageSourcePropType;
  cards: CARDS;
}
