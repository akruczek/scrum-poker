export enum LANGUAGE_CODES {
  PL = 'pl',
  EN = 'en',
};

export enum TRANSLATIONS {
  MULTI_PLAYER = 'multi_player',
  SINGLE_PLAYER = 'single_player',
  SETTINGS = 'settings',
  LOGOUT = 'logout',
  RELOAD_REQUEST = 'reload_request',
  LANGUAGE_EN = 'language_en',
  LANGUAGE_EN_NATIVE = 'language_en_native',
  LANGUAGE_PL = 'language_pl',
  LANGUAGE_PL_NATIVE = 'language_pl_native',
  JOIN = 'join',
  JOIN_SESSION = 'join_session',
  LOGIN = 'login',
  SIGN_IN = 'sign_in',
  WRONG_EMAIL = 'wrong_email',
  CREATE_ROOM = 'create_room',
  UPDATE_ROOM = 'update_room',
  CREATE = 'create',
  DISMISS = 'dismiss',
  PLACEHOLDER_NAME = 'placeholder_name',
  PLACEHOLDER_DESCRIPTION = 'placeholder_description',
  ADD_ROOM = 'add_room',
  ADD_NEW_ROOM = 'add_new_room',
  ROOM = 'room',
  SHOW_DOWN = 'show_down',
  RESET = 'reset',
  NAVIGATION_SINGLE = 'navigation_single',
  NAVIGATION_MULTI = 'navigation_multi',
  NAVIGATION_SETTINGS = 'navigation_settings',
}

export type Translation = {[key: string]: string};

export interface TranslationsStateModel {
  isPending: boolean;
  models: Translation[];
  language: LANGUAGE_CODES;
  error: {};
}
