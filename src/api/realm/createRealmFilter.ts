/* @flow strict-local */
import { Auth, ApiResponseSuccess } from '../transportTypes';
import { apiPost } from '../apiFetch';
type ApiResponseRealmCreateFilters = {
  id: number;
} | ApiResponseSuccess;
/** https://zulipchat.com/api/create-org-filters */

export default (async (auth: Auth, pattern: string, urlFormatString: string): Promise<ApiResponseRealmCreateFilters> => apiPost(auth, 'realm/filters', {
  pattern,
  url_format_string: urlFormatString
}));
