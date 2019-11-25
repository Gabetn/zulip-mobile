/* @flow strict-local */
import { Auth } from '../transportTypes';
import { apiGet } from '../apiFetch';
export default ((auth: Auth, id: number): Promise<unknown> => apiGet(auth, `realm/user_groups/${id}`));
