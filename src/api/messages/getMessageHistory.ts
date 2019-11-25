/* @flow strict-local */
import { Auth, ApiResponseSuccess } from '../transportTypes';
import { MessageSnapshot } from '../apiTypes';
import { apiGet } from '../apiFetch';
type ApiResponseMessageHistory = {
  message_history: MessageSnapshot[];
} | ApiResponseSuccess;
/** See https://zulipchat.com/api/get-message-history */

export default (async (auth: Auth, messageId: number): Promise<ApiResponseMessageHistory> => apiGet(auth, `messages/${messageId}/history`, {
  message_id: messageId
}));
