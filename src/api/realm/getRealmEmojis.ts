/* @flow strict-local */
import { Auth, ApiResponseSuccess } from '../transportTypes';
import { RealmEmojiById } from '../apiTypes';
import { apiGet } from '../apiFetch';
type ApiResponseRealmEmojis = {
  emoji: RealmEmojiById;
} | ApiResponseSuccess;
export default (async (auth: Auth): Promise<ApiResponseRealmEmojis> => apiGet(auth, 'realm/emoji'));
