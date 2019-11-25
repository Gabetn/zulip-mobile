/* @flow strict-local */
import { Auth, ApiResponseSuccess } from '../transportTypes';
import { apiGet } from '../apiFetch';
type ApiResponseUserProfile = {
  client_id: string;
  email: string;
  full_name: string;
  is_admin: boolean;
  is_bot: boolean;
  max_message_id: number;
  pointer: number;
  short_name: string;
  user_id: number;
} | ApiResponseSuccess;
/** See https://zulipchat.com/api/get-profile */

export default ((auth: Auth, clientGravatar: boolean = true): Promise<ApiResponseUserProfile> => apiGet(auth, 'users/me'));
