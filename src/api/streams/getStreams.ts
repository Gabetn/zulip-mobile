/* @flow strict-local */
import { Auth, ApiResponseSuccess } from '../transportTypes';
import { Stream } from '../apiTypes';
import { apiGet } from '../apiFetch';
type ApiResponseStreams = {
  streams: Stream[];
} | ApiResponseSuccess;
/** See https://zulipchat.com/api/get-all-streams */

export default (async (auth: Auth): Promise<ApiResponseStreams> => apiGet(auth, 'streams'));
