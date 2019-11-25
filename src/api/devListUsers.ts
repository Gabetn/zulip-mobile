/* @flow strict-local */
import { Auth, ApiResponseSuccess } from './transportTypes';
import { DevUser } from './apiTypes';
import { apiGet } from './apiFetch';
type ApiResponseDevListUsers = {
  direct_admins: DevUser[];
  direct_users: DevUser[];
} | ApiResponseSuccess;
export default ((auth: Auth): Promise<ApiResponseDevListUsers> => apiGet(auth, 'dev_list_users'));
