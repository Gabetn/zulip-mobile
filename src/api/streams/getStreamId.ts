/* @flow strict-local */
import { Auth, ApiResponseSuccess } from '../transportTypes';
import { apiGet } from '../apiFetch';
type ApiResponseStreamId = {
  stream_id: number;
} | ApiResponseSuccess;
/** See https://zulipchat.com/api/get-stream-id */

export default (async (auth: Auth, stream: string): Promise<ApiResponseStreamId> => apiGet(auth, 'get_stream_id', {
  stream
}));
