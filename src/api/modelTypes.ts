/**
 * Types for things in the Zulip data model, as seen in the API.
 *
 * @flow strict-local
 */
//
//
//
// ===================================================================
// Data attached to the realm or the server.
//
//
export type ImageEmojiType = Readonly<{
  author?: Readonly<{
    email: string;
    full_name: string;
    id: number;
  }>;
  deactivated: boolean;
  id?: number;
  code: string;
  name: string;
  source_url: string;
}>;
export type RealmEmojiById = Readonly<{
  [id: string]: ImageEmojiType;
}>;
export type RealmFilter = [string, string, number]; //
//
//
// ===================================================================
// Users and data about them.
//
//

export type DevUser = {
  realm_uri: string;
  email: string;
};
/**
 * A Zulip user.
 *
 * This is a user object as found in properties `realm_users` and
 * `realm_non_active_users` of a `/register` response.
 *
 * For details on the properties, see the Zulip API docs on `/users`:
 *   https://zulipchat.com/api/get-all-users#response
 * which returns almost the same set of properties.
 *
 * See also the comments on `UserProfile` in the server (lineno is approx.):
 *   https://github.com/zulip/zulip/blob/master/zerver/models.py#L734
 * Most properties correspond to fields on `UserProfile`, and many are
 * described most usefully there.
 *
 * For authoritative results, consult how `raw_users`, and then
 * `realm_users` and `realm_non_active_users`, are computed in
 * `zulip/zulip:zerver/lib/events.py` .
 *
 * Properties are listed below in the order they appear on `UserProfile`,
 * because that's the most logically-organized and also the most helpful
 * of the references above.
 */

export type User = {
  user_id: number;
  email: string;
  full_name: string;
  date_joined?: string;
  is_admin: boolean;
  is_guest?: boolean;
  is_bot: boolean;
  bot_type?: number;
  bot_owner?: string;
  timezone: string;
  avatar_url: string | null;
  profile_data?: never;
};
export type CrossRealmBot = {
  avatar_url?: string | null;
  date_joined?: string;
  email: string;
  full_name: string;
  is_admin: boolean;
  is_bot: true;
  user_id: number;
  timezone?: string;
};
export type UserGroup = {
  description: string;
  id: number;
  members: number[];
  name: string;
};
/**
 * Specifies user status related properties
 * @prop away - present if we are to override user's presence status
 *   * This is the "user status" / "unavailable" feature added in early 2019.
 *     (At time of writing, there are no docs to link to.)
 * @prop status_text - a string representing information the user decided to
 *   manually set as their 'current status'
 */

export type UserStatus = {
  away?: true;
  status_text?: string;
};
export type UserStatusMapObject = {
  [userId: number]: UserStatus;
};
/** See ClientPresence, and the doc linked there. */

export type PresenceStatus = "active" | "idle" | "offline";
/**
 * A user's presence status, as reported by a specific client.
 *
 * For an explanation of the Zulip presence model and how to interpret
 * `status` and `timestamp`, see the subsystem doc:
 *   https://zulip.readthedocs.io/en/latest/subsystems/presence.html
 *
 * @prop timestamp - When the server last heard from this client.
 * @prop status - See the presence subsystem doc.
 * @prop client
 * @prop pushable - Legacy; unused.
 */

export type ClientPresence = {
  status: PresenceStatus;
  timestamp: number;
  client: string;
  pushable?: never;
};
/**
 * A user's presence status, including all information from all their clients.
 *
 * The `aggregated` property equals one of the others.  For details, see:
 *   https://zulipchat.com/api/get-presence
 *
 * See also the app's `getAggregatedPresence`, which reimplements a version
 * of the logic to compute `aggregated`.
 */

export type UserPresence = {
  aggregated: ClientPresence;
  [client: string]: ClientPresence;
}; //
//
//
// ===================================================================
// Streams, topics, and stuff about them.
//
//

export type Stream = {
  stream_id: number;
  description: string;
  name: string;
  invite_only: boolean;
  is_announcement_only: boolean;
  history_public_to_subscribers: boolean;
};
export type Subscription = {
  color: string;
  in_home_view: boolean;
  pin_to_top: boolean;
  audible_notifications: boolean;
  desktop_notifications: boolean;
  email_address: string;
  is_old_stream: boolean;
  push_notifications: boolean;
  stream_weekly_traffic: number;
} | Stream;
export type Topic = {
  name: string;
  max_id: number;
}; //
//
//
// ===================================================================
// Narrows.
//
//

export type NarrowOperator = "is" | "in" | "near" | "id" | "stream" | "topic" | "sender" | "pm-with" | "search";
export type NarrowElement = Readonly<{
  operand: string;
  operator?: NarrowOperator;
}>;
export type Narrow = ReadonlyArray<NarrowElement>; //
//
//
// ===================================================================
// Messages and things attached to them.
//
//

/**
 * Type of an emoji reaction to a message.
 *
 * These correspond to the values allowed for Reaction.reaction_type in the
 * server's models.  The values are:
 *  * unicode_emoji: An emoji found in Unicode, corresponding to a sequence
 *    of Unicode code points.  The list of these depends on the Zulip
 *    server's version.
 *  * realm_emoji: A custom emoji uploaded by some user on a given realm.
 *  * zulip_extra_emoji: An emoji distributed with Zulip, like :zulip:.
 *
 * See `Reaction` which uses this.
 */

export type ReactionType = "unicode_emoji" | "realm_emoji" | "zulip_extra_emoji";
/**
 * An emoji reaction to a message.
 *
 * The raw JSON from the server may have a different structure, but we
 * normalize it to this form.
 */

export type Reaction = Readonly<{
  user_id: number;
  emoji_name: string;
  reaction_type: ReactionType;
  emoji_code: string;
}>;
/**
 * "Snapshot" objects from https://zulipchat.com/api/get-message-history .
 *
 * See also `MessageEdit`.
 */

export type MessageSnapshot = Readonly<{
  user_id: number;
  timestamp: number;
  topic?: string;
  content?: string;
  rendered_content?: string;
  prev_content?: string;
  prev_rendered_content?: string;
  content_html_diff?: string;
}>;
/**
 * Found in the history within a `Message` object.
 *
 * See also `MessageSnapshot`.
 */

export type MessageEdit = Readonly<{
  prev_content?: string;
  prev_rendered_content?: string;
  prev_rendered_content_version?: number;
  prev_subject?: string;
  timestamp: number;
  user_id: number;
}>;
/** A user, as seen in the `display_recipient` of a PM `Message`. */

export type PmRecipientUser = {
  email: string;
  full_name: string;
  id: number;
  is_mirror_dummy: boolean;
  short_name: string;
};
/**
 * Submessages are items containing extra data that can be added to a
 * message. Despite what their name might suggest, they are not a subtype
 * of the `Message` type, nor do they share almost any fields with it.
 *
 * Submessages are used by Widgets:
 * https://zulip.readthedocs.io/en/latest/subsystems/widgets.html
 *
 * Normally a message contains an empty array of these. We differentiate
 * between a normal message and a widget by the length of `submessages`
 * array property. Widgets will have 1 or more submessages.
 */

export type Submessage = Readonly<{
  id: number;
  message_id: number;
  sender_id: number;
  msg_type: "widget";
  content: string;
}>;
/**
 * A Zulip message.
 *
 * This type is mainly intended to represent the data the server sends as
 * the `message` property of an event of type `message`.  Caveat lector: we
 * pass these around to a lot of places, and do a lot of further munging, so
 * this type may not quite represent that.  Any differences should
 * definitely be commented, and perhaps refactored.
 *
 * The server's behavior here is undocumented and the source is very
 * complex; this is naturally a place where a large fraction of all the
 * features of Zulip have to appear.
 *
 * Major appearances of this type include
 *  * `message: Message` on a server event of type `message`, and our
 *    `EVENT_NEW_MESSAGE` Redux action for the event;
 *  * `messages: Message[]` in a `/messages` (our `getMessages`) response,
 *    and our resulting `MESSAGE_FETCH_COMPLETE` Redux action;
 *  * `messages: { [id]: Message }` in our global Redux state.
 *
 * References include:
 *  * the two example events at https://zulipchat.com/api/get-events-from-queue
 *  * `process_message_event` in zerver/tornado/event_queue.py; the call
 *    `client.add_event(user_event)` makes the final determination of what
 *    goes into the event, so `message_dict` is the final value of `message`
 *  * `MessageDict.wide_dict` and its helpers in zerver/lib/message.py;
 *    via `do_send_messages` in `zerver/lib/actions.py`, these supply most
 *    of the data ultimately handled by `process_message_event`
 *  * the `Message` and `AbstractMessage` models in zerver/models.py, but
 *    with caution; many fields are adjusted between the DB row and the event
 *  * empirical study looking at Redux events logged [to the
 *    console](docs/howto/debugging.md).
 *
 * See also `Outbox`, which is deliberately similar so that we can use
 * the type `Message | Outbox` in many places.
 *
 * See also `MessagesState` for discussion of how we fetch and store message
 * data.
 */

export type Message = Readonly<{
  isOutbox: false;
  match_content?: string;
  match_subject?: string;
  sender_domain: string;
  flags?: ReadonlyArray<string>;
  avatar_url: string | null;
  client: string;
  content: string;
  content_type: "text/html" | "text/markdown";
  display_recipient: any;
  edit_history: ReadonlyArray<MessageEdit>;
  gravatar_hash: string;
  id: number;
  is_me_message: boolean;
  last_edit_timestamp?: number;
  reactions: ReadonlyArray<Reaction>;
  recipient_id: number;
  sender_email: string;
  sender_full_name: string;
  sender_id: number;
  sender_realm_str: string;
  sender_short_name: string;
  stream_id: number;
  subject: string;
  subject_links: ReadonlyArray<string>;
  submessages?: ReadonlyArray<Submessage>;
  timestamp: number;
  type: "stream" | "private";
}>;
