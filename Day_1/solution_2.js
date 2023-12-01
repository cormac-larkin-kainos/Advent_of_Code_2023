import * as fs from "fs/promises";


// Start with a sum of 0
let sum = 0;

// Read the file contents
const fileContents = await readFile('input_1.txt');

// Split the contents into individual lines
const linesArray = splitFileIntoLines(fileContents);

// Get the hidden number from each line and add it to the sum.
linesArray.forEach((line) => {
    sum += getNumberFromLine(line);
});

// Print the result
console.log(`Result: ${sum}`);


/**
 * Combines the first and last numbers in the line of text to form a new number.
 * 
 * @param {String} line 
 * @returns {Number} The combination of the first and last numbers in the line of text, or 0 if the line contains no digits. 
 */
function getNumberFromLine(line) {

    const hashMap = new Map();

    const numericWords = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];
    const numericCharacters = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];

    // Search the line for numeric words. 
    // If one is found, convert the word to a number and store it in the HashMap along with the indexes of its first and last occurrences
    numericWords.forEach((word) => {
        if (line.indexOf(word) !== -1) {
            hashMap.set(line.indexOf(word), convertWordToNumber(word));
        }

        if (line.lastIndexOf(word) !== -1) {
            hashMap.set(line.lastIndexOf(word), convertWordToNumber(word));
        }
    });

    // Search the line for digit characters.
    // If found, store them in the HashMap along with along with the indexes of its first and last occurrences
    numericCharacters.forEach((character) => {
        if (line.indexOf(character) !== -1) {
            hashMap.set(line.indexOf(character), character);
        }

        if (line.lastIndexOf(character) !== -1) {
            hashMap.set(line.lastIndexOf(character), character);
        }
    });

    // Get the first and last indexes from the HashMap
    const keysArray = Array.from(hashMap.keys())
    const minKey = Math.min(...keysArray);
    const maxKey = Math.max(...keysArray);

    // Get the values associated with those keys (these are our first and last numbers from the line)
    const firstNumber = hashMap.get(minKey);
    const lastNumber = hashMap.get(maxKey);

    // Combine the two characters and cast them into a Number. Return this number
    return Number(firstNumber + lastNumber);

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

/**
 * Converts a numeric word into a digit string.
 * 
 * @param {*} word A numeric word such as 'one', 'two', etc.
 * @returns {String} The number as a digit ('1', '2', etc.)
 */
function convertWordToNumber(word) {
    switch (word) {
        case 'one':
            return '1';
        case 'two':
            return '2';
        case 'three':
            return '3';
        case 'four':
            return '4';
        case 'five':
            return '5';
        case 'six':
            return '6';
        case 'seven':
            return '7';
        case 'eight':
            return '8';
        case 'nine':
            return '9';
        default:
            break;
    }
}