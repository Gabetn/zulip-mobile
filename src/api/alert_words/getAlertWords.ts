/* @flow strict-local */
import { Auth, ApiResponseSuccess } from '../transportTypes';
import { apiGet } from '../apiFetch';
type ApiResponseAlertWords = {
  alert_words: string[];
} | ApiResponseSuccess;
export default (async (auth: Auth): Promise<ApiResponseAlertWords> => apiGet(auth, 'users/me/alert_words'));
