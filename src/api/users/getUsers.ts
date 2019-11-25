/* @flow strict-local */
import { Auth, ApiResponseSuccess } from '../transportTypes';
import { User } from '../apiTypes';
import { apiGet } from '../apiFetch';
type ApiResponseUsers = {
  members: User[];
} | ApiResponseSuccess;
/** See https://zulipchat.com/api/get-all-users */

export default ((auth: Auth): Promise<ApiResponseUsers> => apiGet(auth, 'users', {
  client_gravatar: true
}));
