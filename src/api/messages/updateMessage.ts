/* @flow strict-local */
import { ApiResponse, Auth } from '../transportTypes';
import { apiPatch } from '../apiFetch';
/** See https://zulipchat.com/api/update-message */

export default (async (auth: Auth, params: Readonly<{
  subject?: string;
  propagate_mode?: boolean;
  content?: string;
}>, id: number): Promise<ApiResponse> => apiPatch(auth, `messages/${id}`, params));
