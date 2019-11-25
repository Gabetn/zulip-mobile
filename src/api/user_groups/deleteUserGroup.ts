/* @flow strict-local */
import { ApiResponse, Auth } from '../transportTypes';
import { apiDelete } from '../apiFetch';
export default (async (auth: Auth, id: number): Promise<ApiResponse> => apiDelete(auth, `user_groups/${id}`));
