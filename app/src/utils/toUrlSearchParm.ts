/**
 * Converts an object with string- or number-valued properties
 * into a URLSearchParams instance.
 *
 * @template T extends Record<string, string|number>
 * @param {Record<string, string|number>} data - Object whose values are only strings or numbers.
 * @returns {URLSearchParams} URLSearchParams instance representing the given data.
 */
export function toUrlSearchParams<
  T extends object
>(data: T): URLSearchParams {
  const params = new URLSearchParams();

  for (const [key, value] of Object.entries(data)) {
    // díky constraintu T jsou tu jen string|number
    params.append(key, String(value));
  }

  return params;
}