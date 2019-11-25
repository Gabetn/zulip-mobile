/* @flow strict-local */
import { Auth, ApiResponseSuccess } from '../transportTypes';
import { RealmFilter } from '../apiTypes';
import { apiGet } from '../apiFetch';
type ApiResponseRealmFilters = {
  filters: RealmFilter[];
} | ApiResponseSuccess;
export default (async (auth: Auth): Promise<ApiResponseRealmFilters> => apiGet(auth, 'realm/filters'));
