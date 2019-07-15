export enum CARD_COLORS {
  green = 'greenCard',
  yellow = 'yellowCard',
  orange = 'orangeCard',
  purple = 'purpleCard',
  red = 'redCard',
}

export interface PokerCard {
  value: number | any;
  label: string;
}