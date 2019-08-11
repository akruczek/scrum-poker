export type CardColors = 'green' | 'yellow' | 'orange' | 'purple' | 'red';

export enum CARD_COLORS {
  green = 'GREEN_CARD',
  yellow = 'YELLOW_CARD',
  orange = 'ORANGE_CARD',
  purple = 'PURPLE_CARD',
  red = 'RED_CARD',
}

export interface PokerCard {
  value: number | any;
  label: string;
}