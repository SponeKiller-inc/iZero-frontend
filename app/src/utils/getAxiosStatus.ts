import { isAxiosError } from "axios";

/**
 * Extracts the HTTP status code from an Axios error.
 *
 * @param error - Unknown error thrown in a try/catch block.
 * @param fallback - Status code to return if the error is not an AxiosError or has no response (default: 500).
 * @returns The HTTP status code from the Axios error response or the fallback value.
 */
const getAxiosStatus = (error: unknown, fallback = 500): number => {
  if (isAxiosError(error)) {
    return error.response?.status ?? fallback;
  }
  return fallback;
}

export default getAxiosStatus;