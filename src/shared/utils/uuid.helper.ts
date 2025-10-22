import { uuidv7 } from 'uuidv7';

/**
 * Helper class for UUIDv7 operations
 * UUIDv7 provides chronologically sortable unique identifiers
 * with better database index performance than UUIDv4
 */
export class UuidHelper {
  /**
   * Generates a new UUIDv7
   * @returns A new UUIDv7 string
   */
  static generate(): string {
    return uuidv7();
  }

  /**
   * Extracts the timestamp from a UUIDv7
   * @param uuid - The UUIDv7 string
   * @returns The timestamp in milliseconds
   */
  static getTimestamp(uuid: string): number {
    // Extract the first 48 bits which contain the Unix timestamp in milliseconds
    const hex = uuid.replace(/-/g, '').substring(0, 12);
    return parseInt(hex, 16);
  }

  /**
   * Validates if a string is a valid UUIDv7
   * @param uuid - The string to validate
   * @returns True if valid UUIDv7, false otherwise
   */
  static isValid(uuid: string): boolean {
    const uuidv7Regex = /^[0-9a-f]{8}-[0-9a-f]{4}-7[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return uuidv7Regex.test(uuid);
  }
}
