export enum LANGUAGE_CODES {
  PL = 'pl',
  EN = 'en',
};

export enum TRANSLATIONS {
  MULTI_PLAYER = 'multi_player',
  SINGLE_PLAYER = 'single_player',
  SETTINGS = 'settings',
}

export type Translation = {[key: string]: string};

export interface TranslationsStateModel {
  isPending: boolean;
  models: Translation[];
  language: LANGUAGE_CODES;
  error: {};
}
