 /**
  * Convert a CSV string into an array of objects whose properties are the column names.
  * @param input The input string to parse.
  * @returns An array of objects representing the parsed input.
  */
 export function parseWithHeaders(input: string): Record<string, string>[] {
    let parsed = parseWithoutHeaders(input);
    if(parsed.length < 2) {
        throw new Error('Invalid input. Expected at least two lines.');
    }
    let headers = parsed.shift();
    if(!headers) {
        throw new Error('This should be impossible.');
    }
    let result: Record<string, string>[] = [];
    for(let i = 0; i < parsed.length; i++) {
        let row = parsed[i];
        if(row.length < headers.length) {
            throw new Error('Invalid input. Some rows have less columns than there are headers. Row ' + (i + 1) + ' has ' + row.length + ' columns.');
        }
        let record: Record<string, string> = {};
        for(let j = 0; j < headers.length; j++) {
            record[headers[j]] = row[j];
        }
        result.push(record);
    }
    return result;
}

/**
 * Parses a CSV string into an array of lines.
 * @param input CSV string to parse.
 * @returns An array of arrays of strings.
 */
export function parseWithoutHeaders(input: string): string[][] {

    
    let result: string[][] = [];

    let current_line = [];
    
    let current_cell = "";

    let inQuotes = false;
    for(let i = 0; i < input.length; i++) {

        /**
         * Previous Character
         */
        let p = i > 0 ? input[i - 1] : "";

        /**
         * Current Character
         */
        let c = input[i];

        /**
         * Next Character
         */
        let n = i < input.length - 1 ? input[i + 1] : "";

        // If it's a comma and we're not in quotes, we're done with the current cell.
        if(c === ',' && !inQuotes) {
            current_line.push(current_cell);
            current_cell = "";
            continue;
        } 
        
        // If it's not in quotes and a new line, we're done with the current line.
        else if (!inQuotes && (c === '\r' || c === '\n')) {
            current_line.push(current_cell);
            current_cell = "";
            if(current_line.length > 0)
                result.push(current_line.map(cell => cell.trim()));
            current_line = [];
            if(n === '\r' || n === '\n') {
                i++;
            }
            continue;
        }

        // If it's the beginning of the cell and it's a quote, we're in quotes.
        else if (!inQuotes && c === '"' && current_cell.trim().length === 0) {
            inQuotes = true;
            continue;
        }
        
        // If we're in the middle of a cell and it's a quote, and the previous and next characters are not quotes, we're
        // at the end of the cell and can exit quotes.
        else if (inQuotes && c === '"' && n !== '"') {
            inQuotes = false;
            continue;
        }

        // If it's a double quote, we can remove the escape character.
        else if (inQuotes && c === '"' && n === '"') {
            current_cell += c;
            i++;
            continue;
        }
        
        // If there are no more special cases, just add the character to the current cell.
        else {
            current_cell += c;
        }
    }

    if(current_cell)
        current_line.push(current_cell);
    if(current_line.length > 0)
        result.push(current_line.map(cell => cell.trim()));

    // Remove lines that are empty or have cells that are all empty.
    result = result.filter(line => line.filter(cell => cell.trim().length > 0).length > 0);

    return result;

}