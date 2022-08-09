"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseWithoutHeaders = exports.parseWithHeaders = void 0;
/**
 * Convert a CSV string into an array of objects whose properties are the column names.
 * @param input The input string to parse.
 * @returns An array of objects representing the parsed input.
 */
function parseWithHeaders(input) {
    let parsed = parseWithoutHeaders(input);
    if (parsed.length < 2) {
        throw new Error('Invalid input. Expected at least two lines.');
    }
    let headers = parsed.shift();
    if (!headers) {
        throw new Error('This should be impossible.');
    }
    let result = [];
    for (let i = 0; i < parsed.length; i++) {
        let row = parsed[i];
        if (row.length < headers.length) {
            throw new Error('Invalid input. Some rows have less columns than there are headers.');
        }
        let record = {};
        for (let j = 0; j < headers.length; j++) {
            record[headers[j]] = row[j];
        }
        result.push(record);
    }
    return result;
}
exports.parseWithHeaders = parseWithHeaders;
/**
 * Parses a CSV string into an array of lines.
 * @param input CSV string to parse.
 * @returns An array of arrays of strings.
 */
function parseWithoutHeaders(input) {
    let lines = input.split(getLineSplitRegex());
    lines = lines.map(line => line.trim());
    lines = lines.filter(line => line.length > 0);
    return lines.map(line => parseLine(line));
}
exports.parseWithoutHeaders = parseWithoutHeaders;
/**
 * Returns a regex that matches a line break.
 * @returns A regex that matches a line split by the newline character.
 */
function getLineSplitRegex() {
    return /\r\n|\r|\n/g;
}
/**
 * Parses a line of CSV into an array of strings.
 * @param line A line of CSV data.
 * @returns A string array of each cell of the line.
 */
function parseLine(line) {
    let result = [];
    let current = "";
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
        if (line[i] === ',' && !inQuotes) {
            result.push(current);
            current = "";
            inQuotes = false;
            continue;
        }
        else if (line[i] === '"' && current === "") {
            inQuotes = true;
            continue;
        }
        else if (line[i] === '"' && current !== "" && line[i - 1] !== '\\') {
            inQuotes = false;
            continue;
        }
        else if (line[i] === '\\' && line.length > i && line[i + 1] === '"') {
            continue;
        }
        else {
            current += line[i];
        }
    }
    result.push(current);
    return result;
}
