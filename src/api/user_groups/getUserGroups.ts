/* @flow strict-local */
import { Auth } from '../transportTypes';
import { apiGet } from '../apiFetch';
export default ((auth: Auth): Promise<unknown> => apiGet(auth, 'users/me/user_groups'));
