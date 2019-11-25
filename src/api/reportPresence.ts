/* @flow strict-local */
import { ApiResponse, Auth } from './transportTypes';
import { UserPresence } from './apiTypes';
import { apiPost } from './apiFetch';
type ApiResponseWithPresence = {
  server_timestamp: number;
  presences: {
    [email: string]: UserPresence;
  };
} | ApiResponse;
/** See https://zulip.readthedocs.io/en/latest/subsystems/presence.html . */

export default ((auth: Auth, hasFocus: boolean = true, newUserInput: boolean = false): Promise<ApiResponseWithPresence> => apiPost(auth, 'users/me/presence', {
  status: hasFocus ? 'active' : 'idle',
  new_user_input: newUserInput
}));
