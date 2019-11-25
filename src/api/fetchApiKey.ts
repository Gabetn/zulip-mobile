/* @flow strict-local */
import { Auth, ApiResponseSuccess } from './transportTypes';
import { apiPost } from './apiFetch';
type ApiResponseFetchApiKey = {
  email: string;
  api_key: string;
} | ApiResponseSuccess;
export default ((auth: Auth, email: string, password: string): Promise<ApiResponseFetchApiKey> => apiPost(auth, 'fetch_api_key', {
  username: email,
  password
}));
