/* @flow strict-local */
import { Auth, ApiResponseSuccess } from '../transportTypes';
import { Subscription } from '../apiTypes';
import { apiGet } from '../apiFetch';
type ApiResponseSubscriptions = {
  subscriptions: Subscription[];
} | ApiResponseSuccess;
/** See https://zulipchat.com/api/get-subscribed-streams */

export default ((auth: Auth): Promise<ApiResponseSubscriptions> => apiGet(auth, 'users/me/subscriptions'));
