import format from 'string-template';

import config from './config';

export function endpoint(url, data) {
  return format(url, data);
}

export const LOGIN = `${config.api_url}auth/login`;
export const ME = `${config.api_url}me`;
export const USERS = `${config.api_url}user`;
export const USER = `${USERS}/{id}`;
export const GROUPS = `${config.api_url}group`;
export const GROUPS_ADDABLES = `${GROUPS}/addables`;
export const GROUP = `${GROUPS}/{id}`;
export const GROUP_MEMBER = `${GROUP}/member`;
export const TASKS = `${config.api_url}task`;
export const TASKS_REOPENABLE = `${TASKS}/reopenable`;
export const TASKS_ASSIGNABLE = `${TASKS}/assignable`;
export const TASK = `${TASKS}/{id}`;
export const TASK_HAVE_PERMISSION = `${TASK}/permission`;
export const TASK_START = `${TASK}/start`;
export const TASK_CHECK = `${TASK}/check`;
export const TASK_CONFIRM = `${TASK}/confirm`;
export const TASK_VERIFY = `${TASK}/verify`;
export const TASK_CLOSE = `${TASK}/close`;
export const NOTIS = `${config.api_url}noti`;
export const NOTI = `${NOTIS}/{id}`;
