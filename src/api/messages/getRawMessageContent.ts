/* @flow strict-local */
import { Auth, ApiResponseSuccess } from '../transportTypes';
import { apiGet } from '../apiFetch';
type ApiResponseMessageContent = {
  raw_content: string;
} | ApiResponseSuccess;
/** See https://zulipchat.com/api/get-raw-message */

export default (async (auth: Auth, messageId: number): Promise<ApiResponseMessageContent> => apiGet(auth, `messages/${messageId}`));
