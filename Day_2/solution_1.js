import * as fs from "fs/promises";

const MAX_REDS = 12;
const MAX_GREENS = 13;
const MAX_BLUES = 14;

const RED_REGEX = /(\d+)\sred/g;
const GREEN_REGEX = /(\d+)\sgreen/g;
const BLUE_REGEX = /(\d+)\sblue/g;

const GAME_ID_REGEX = /(\d+):/g;

// Start with a sum of 0
let sum = 0;

// Read the file contents
const fileContents = await readFile('input.txt');

// Split the contents into individual lines
const linesArray = splitFileIntoLines(fileContents);

// Iterate over the lines ('games') and add their ID to the sum if they meet the criteria
linesArray.forEach((line) => {
    if (meetsCriteria(line)) {
        sum += getGameID(line);
    }
});

// Print the result
console.log(`Result: ${sum}`);

/**
 * Gets the game ID from the input line
 * 
 * @param {string} line 
 * @returns {Number} The Game ID from the line
 */
function getGameID(line) {
    const matches = line.match(GAME_ID_REGEX);

    return matches.map(match => Number(match.replace(/:$/, '')))[0];
}

/**
 * Checks if a line meets the specified criteria for the number of cubes
 * 
 * @param {string} line 
 * @returns {boolean} True if the line meets the specified criteria, otherwise false
 */
function meetsCriteria(line) {

    if (getMaxReds(line) > MAX_REDS) {
        return false;
    }

    if (getMaxGreens(line) > MAX_GREENS) {
        return false;
    }

    if (getMaxBlues(line) > MAX_BLUES) {
        return false;
    }

    return true;
}

/**
 * Gets the maximimum number of red cubes mentioned in the line of text
 * 
 * @param {string} line 
 * @returns {Number}
 */
function getMaxReds(line) {
    const matches = line.match(RED_REGEX);

    // Find all the red counts mentioned in the line and add them to an array
    const allReds = matches.map(match => Number(match.replace(/\sred$/, '')));

    // Return the max value from the array
    return Math.max(...allReds);
}

/**
 * Gets the maximimum number of green cubes mentioned in the line of text
 * 
 * @param {string} line 
 * @returns {Number}
 */
function getMaxGreens(line) {
    const matches = line.match(GREEN_REGEX);

    // Find all the green counts mentioned in the line and add them to an array
    const allGreens = matches.map(match => Number(match.replace(/\sgreen$/, '')));

    // Return the max value from the array
    return Math.max(...allGreens);
}

/**
 * Gets the maximimum number of blue cubes mentioned in the line of text
 * 
 * @param {string} line 
 * @returns {Number}
 */
function getMaxBlues(line) {
    const matches = line.match(BLUE_REGEX);

    // Find all the blue counts mentioned in the line and add them to an array
    const allBlues = matches.map(match => Number(match.replace(/\sblue$/, '')));

    // Return the max value from the array
    return Math.max(...allBlues);
}

/**
 * Reads the file contents into memory.
 * 
 * @param {String} filePath 
 * @returns {Promise<String>} The contents of the file as a string.
 */
async function readFile(filePath) {
    try {
        const data = await fs.readFile(filePath, 'utf-8');

        return data;
    } catch (error) {
        console.error('An error occurred when reading the file');
    }
}

/**
 * Splits the file contents into an array of individual lines.
 * 
 * @param {String} fileContents A string containing the file contents.
 * @returns {String[]} An array of strings, where each element is a single line from the text file.
 */
function splitFileIntoLines(fileContents) {
    return fileContents.split('\n');
}
