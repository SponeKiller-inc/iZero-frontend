import { isAxiosError } from "axios";

/**
 * Extracts the API message ID from an Axios error.
 *
 * @param error - Unknown error thrown in a try/catch block.
 * @returns The message ID from the response body, undefined if there is none.
 */
const getApiMessageId = (error: unknown): number | undefined => {
  if (isAxiosError(error)) {
    return error.response?.data?.message_id;
  }
  return undefined;
}

export default getApiMessageId;
