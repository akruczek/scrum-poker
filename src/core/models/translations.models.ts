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
  RELOAD = 'reload',
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
  UPDATE = 'update',
  DISMISS = 'dismiss',
  PLACEHOLDER_NAME = 'placeholder_name',
  PLACEHOLDER_DESCRIPTION = 'placeholder_description',
  ADD_ROOM = 'add_room',
  ADD_NEW_ROOM = 'add_new_room',
  ROOM = 'room',
  SHOW_DOWN = 'show_down',
  RESET = 'reset',
  PUSH_TO_JIRA = 'push_to_jira',
  NAVIGATION_SINGLE = 'navigation_single',
  NAVIGATION_MULTI = 'navigation_multi',
  NAVIGATION_SETTINGS = 'navigation_settings',
  ALL_ADMINS = 'all_admins',
  FINAL_ESTIMATION = 'final_estimation',
  JIRA_ISSUE_KEY = 'jira_issue_key',
  PUSH = 'push',
  JIRA_PUSH_SUCCESS = 'jira_push_success',
  JIRA_PUSH_ERROR = 'jira_push_error',
  JIRA_AUTH_SUCCESS = 'jira_auth_success',
  JIRA_AUTH_ERROR = 'jira_auth_error',
  SIGN_IN_TO_JIRA = 'sign_in_to_jira',
  GENERATE_JIRA_TOKEN_HELP = 'generate_jira_token_help',
  CONNECT_WITH_JIRA = 'connect_with_jira',
  SPACE_NAME = 'space_name',
  TYPE_FINAL_ESTIMATION = 'type_final_estimation',
  OR_CHOOSE = 'or_choose',
  ISSUE_KEY = 'issue_key',
  APPLY = 'apply',
  JIRA_CONFIGURATION = 'jira_configuration',
  JIRA_FIELD_NAME = 'jira_field_name',
  PLACEHOLDER_KEY = 'placeholder_key',
  NO_PROJECT = 'no_project',
  SELECT_PROJECT_ = 'select_project_',
  SELECT_ISSUE_ = 'select_issue_',
  PROJECT_KEY = 'project_key',
  PROJECT_NAME = 'project_name',
  ROOM_DESCRIPTION = 'room_description',
  USE_MY_JIRA_CONFIGURATION = 'use_my_jira_configuration',
  CUSTOM_FIELD = 'custom_field',
  DEFAULT_ISSUE_TYPE = 'default_issue_type',
  DEFAULT_ISSUE_STATUS = 'default_issue_status',
  CUSTOM_FIELD_PLACEHOLDER = 'custom_field_placeholder',
  DEFAULT_ISSUE_TYPE_PLACEHOLDER = 'default_issue_type_placeholder',
  DEFAULT_ISSUE_STATUS_PLACEHOLDER = 'default_issue_status_placeholder',
  DEFAULT_TYPE = 'default_type',
  DEFAULT_STATUS = 'default_status',
  JIRA_UPDATE_CONFIG_SUCCESS = 'jira_update_config_success',
  RESET_USERS = 'reset_users',
  RESET_USERS_MESSAGE = 'reset_users_message',
  YES = 'yes',
  NO = 'no',
}

export type Translation = {[key: string]: string};

export interface TranslationsStateModel {
  isPending: boolean;
  models: Translation[];
  language: LANGUAGE_CODES;
  error: {};
}
