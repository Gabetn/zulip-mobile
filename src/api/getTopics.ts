/* @flow strict-local */
import { Auth, ApiResponseSuccess } from './transportTypes';
import { Topic } from './apiTypes';
import { apiGet } from './apiFetch';
type ApiResponseTopics = {
  topics: Topic[];
} | ApiResponseSuccess;
/** See https://zulipchat.com/api/get-stream-topics */

export default (async (auth: Auth, streamId: number): Promise<ApiResponseTopics> => apiGet(auth, `users/me/${streamId}/topics`));
