/**
 * Convert a CSV string into an array of objects whose properties are the column names.
 * @param input The input string to parse.
 * @returns An array of objects representing the parsed input.
 */
export declare function parseWithHeaders(input: string): Record<string, string>[];
/**
 * Parses a CSV string into an array of lines.
 * @param input CSV string to parse.
 * @returns An array of arrays of strings.
 */
export declare function parseWithoutHeaders(input: string): string[][];
