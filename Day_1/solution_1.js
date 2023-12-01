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
 * Combines the first and last digits in the line of text to form a new number.
 * 
 * @param {String} line 
 * @returns {Number} The combination of the first and last digits in the line of text, or 0 if the line contains no digits. 
 */
function getNumberFromLine(line) {

        const digits = [];
        
        // Iterate over the line and store any digits in the array
        for (let i = 0; i < line.length; i++) {
            if (!isNaN(line[i])) {
                digits.push(line[i]);
            }
        }

        // If line contains digits, concatenate the first and last digits to form a new number
        if (digits.length > 0) {
            const combinedDigits = digits[0] + digits[digits.length - 1];
            return Number(combinedDigits);
        }

        return 0; // Return 0 if the line contains no digits
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


