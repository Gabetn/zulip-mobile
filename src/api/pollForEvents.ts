/* @flow strict-local */
import { ApiResponseSuccess, Auth } from './transportTypes';
import { GeneralEvent } from './eventTypes';
import { apiGet } from './apiFetch';
type ApiResponsePollEvents = {
  events: GeneralEvent[];
} | ApiResponseSuccess;
/** See https://zulipchat.com/api/get-events-from-queue */

export default ((auth: Auth, queueId: number, lastEventId: number): Promise<ApiResponsePollEvents> => apiGet(auth, 'events', {
  queue_id: queueId,
  last_event_id: lastEventId
}, true));
