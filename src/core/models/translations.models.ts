export enum LANGUAGE_CODES {
  PL = 'pl',
  EN = 'en',
};

export enum TRANSLATIONS {
  SINGLE_POKER = 'single_poker',
}

export type Translation = {[key: string]: string};

export interface TranslationsStateModel {
  isPending: boolean;
  models: Translation[];
  error: {};
}
