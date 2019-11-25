/* @flow strict-local */
import { Auth, ApiResponseSuccess } from './transportTypes';
import { apiPost } from './apiFetch';
type ApiResponseDevFetchApiKey = {
  api_key: string;
} | ApiResponseSuccess;
export default ((auth: Auth, email: string): Promise<ApiResponseDevFetchApiKey> => apiPost(auth, 'dev_fetch_api_key', {
  username: email
}));
