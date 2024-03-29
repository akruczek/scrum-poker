export enum CARDS {
  STANDARD_POKER = 'STANDARD_POKER',
  FIBONACCI_POKER = 'FIBONACCI_POKER',
  T_SHIRT_POKER = 'T_SHIRT_POKER',
  RISK_POKER = 'RISK_POKER',
}

export const CARDS_STACK = {
  [CARDS.STANDARD_POKER]: [
    { value: 0, label: '0' },
    { value: 0.5, label: '½' },
    { value: 1, label: '1' },
    { value: 2, label: '2' },
    { value: 3, label: '3' },
    { value: 5, label: '5' },
    { value: 8, label: '8' },
    { value: 13, label: '13' },
    { value: 20, label: '20' },
    { value: 40, label: '40' },
    { value: 100, label: '100' },
    { value: '∞', label: '∞' },
    { value: '?', label: '?' },
  ],
  [CARDS.FIBONACCI_POKER]: [
    { value: 0, label: '0' },
    { value: 1, label: '1' },
    { value: 2, label: '2' },
    { value: 3, label: '3' },
    { value: 5, label: '5' },
    { value: 8, label: '8' },
    { value: 13, label: '13' },
    { value: 21, label: '21' },
    { value: 34, label: '34' },
    { value: 55, label: '55' },
    { value: 89, label: '89' },
    { value: 144, label: '144' },
    { value: '∞', label: '∞' },
    { value: '?', label: '?' },
  ],
  [CARDS.T_SHIRT_POKER]: [
    { value: 1, label: 'XS' },
    { value: 2, label: 'S' },
    { value: 3, label: 'M' },
    { value: 5, label: 'L' },
    { value: 8, label: 'XL' },
    { value: 13, label: 'XXL' },
    { value: '∞', label: '∞' },
    { value: '?', label: '?' },
  ],
  [CARDS.RISK_POKER]: [
    { value: 'risk-green', label: 'green' },
    { value: 'risk-yellow', label: 'yellow' },
    { value: 'risk-orange', label: 'orange' },
    { value: 'risk-purple', label: 'purple' },
    { value: 'risk-red', label: 'red' },
    { value: '∞', label: '∞' },
    { value: '?', label: '?' },
  ],
};
