/* @flow strict-local */
import { ApiResponse, Auth } from '../transportTypes';
import { apiPost } from '../apiFetch';
export default ((auth: Auth, messageId: number, reactionType: string, emojiCode: string, emojiName: string): Promise<ApiResponse> => apiPost(auth, `messages/${messageId}/reactions`, {
  reaction_type: reactionType,
  emoji_code: emojiCode,
  emoji_name: emojiName
}));
