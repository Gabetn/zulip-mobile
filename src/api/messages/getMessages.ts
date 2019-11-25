/* @flow strict-local */
import { Auth, ApiResponseSuccess } from '../transportTypes';
import { Message, Narrow } from '../apiTypes';
import { Reaction } from '../modelTypes';
import { apiGet } from '../apiFetch';
type ApiResponseMessages = {
  anchor: number;
  found_anchor?: boolean;
  found_newest?: boolean;
  found_oldest?: boolean;
  messages: Message[];
} | ApiResponseSuccess;
/**
 * The variant of `Reaction` found in the actual server response.
 *
 * Note that reaction events have a *different* variation; see their
 * handling in `eventToAction`.
 */

type ServerReaction = Readonly<{
  user: Readonly<{
    email: string;
    full_name: string;
    id: number;
  }>;
} | Pick<Reaction, Exclude<keyof Reaction, keyof {
  user_id: unknown;
}>>>;
type ServerMessage = Readonly<{
  reactions: ReadonlyArray<ServerReaction>;
} | Message>; // The actual response from the server.  We convert the data from this to
// `ApiResponseMessages` before returning it to application code.

type ServerApiResponseMessages = {
  messages: ServerMessage[];
} | ApiResponseMessages;
/** Exported for tests only. */

export const migrateMessages = (messages: ServerMessage[]): Message[] => messages.map(message => {
  const {
    reactions,
    ...restMessage
  } = message;
  return { ...restMessage,
    reactions: reactions.map(reaction => {
      const {
        user,
        ...restReaction
      } = reaction;
      return { ...restReaction,
        user_id: user.id
      };
    })
  };
});

const migrateResponse = response => {
  const {
    messages,
    ...restResponse
  } = response;
  return { ...restResponse,
    messages: migrateMessages(messages)
  };
};
/**
 * See https://zulipchat.com/api/get-messages
 *
 * These values exist only in Zulip 1.8 or newer:
 *   * found_anchor
 *   * found_newest
 *   * found_oldest
 */


export default (async (auth: Auth, narrow: Narrow, anchor: number, numBefore: number, numAfter: number, useFirstUnread: boolean = false): Promise<ApiResponseMessages> => {
  const response: ServerApiResponseMessages = await apiGet(auth, 'messages', {
    narrow: JSON.stringify(narrow),
    anchor,
    num_before: numBefore,
    num_after: numAfter,
    apply_markdown: true,
    use_first_unread_anchor: useFirstUnread
  });
  return migrateResponse(response);
});
