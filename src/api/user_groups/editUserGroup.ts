/* @flow strict-local */
import { ApiResponse, Auth } from '../transportTypes';
import { apiPatch } from '../apiFetch';
export default (async (auth: Auth, id: number): Promise<ApiResponse> => apiPatch(auth, `user_groups/${id}`));
