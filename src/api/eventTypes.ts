/**
 * Types for events returned by the server.
 *
 * See server docs:
 *   https://zulipchat.com/api/real-time-events
 *   https://zulip.readthedocs.io/en/latest/subsystems/events-system.html
 *
 * NB this is just a start -- far from complete.
 *
 * @flow strict-local
 */
import { Message, Stream, UserPresence } from './modelTypes';
export class EventTypes {
  static heartbeat: "heartbeat" = 'heartbeat';
  static message: "message" = 'message';
  static presence: "presence" = 'presence';
  static stream: "stream" = 'stream';
  static submessage: "submessage" = 'submessage';
  static update_message_flags: "update_message_flags" = 'update_message_flags';
  static user_status: "user_status" = 'user_status';
}
type EventCommon = {
  id: number;
};
/** A common supertype of all events, known or unknown. */

export type GeneralEvent = {
  type: string;
} | EventCommon;
export type HeartbeatEvent = {
  type: typeof EventTypes.heartbeat;
} | EventCommon;
export type MessageEvent = {
  type: typeof EventTypes.message;
  message: Message;
  flags?: ReadonlyArray<string>;
  local_message_id?: number;
} | EventCommon;
/** A new submessage.  See the `Submessage` type for details. */

export type SubmessageEvent = {
  type: typeof EventTypes.submessage;
  submessage_id: number;
  message_id: number;
  sender_id: number;
  msg_type: "widget";
  content: string;
} | EventCommon;
export type PresenceEvent = {
  type: typeof EventTypes.presence;
  email: string;
  server_timestamp: number;
  presence: UserPresence;
} | EventCommon;
/**
 * Updates the user status for a user
 *
 * @prop [away] - update user's away status:
 *       - `true` the user is away regardless of presence
 *       - `false` remove the away status, now use presence
 * @prop [status_text] - if present:
 *       - empty string clears the user's status text
 *       - any string sets user's status to that
 *
 * Not providing a property means 'leave this value unchanged'
 */

export type UserStatusEvent = {
  type: typeof EventTypes.user_status;
  user_id: number;
  away?: boolean;
  status_text?: string;
} | EventCommon;
type StreamListEvent = {
  type: typeof EventTypes.stream;
  streams: Stream[];
} | EventCommon; // prettier-ignore

export type StreamEvent = ({
  op: "create";
} | StreamListEvent) | ({
  op: "delete";
} | StreamListEvent) | ({
  op: "occupy";
} | StreamListEvent) | ({
  op: "vacate";
} | StreamListEvent) | ({
  type: typeof EventTypes.stream;
  op: "update";
  stream_id: number;
  name: string;
  property: string;
  value: string;
} | EventCommon);
export type UpdateMessageFlagsEvent = {
  type: typeof EventTypes.update_message_flags;
  operation: "add" | "remove";
  flag: never;
  all: boolean;
  messages: number[];
} | EventCommon;
