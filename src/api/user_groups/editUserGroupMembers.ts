/* @flow strict-local */
import { ApiResponse, Auth } from '../transportTypes';
import { apiPost } from '../apiFetch';
export default (async (auth: Auth, id: number): Promise<ApiResponse> => apiPost(auth, `user_groups/${id}/members`));
