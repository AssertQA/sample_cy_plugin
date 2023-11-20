//Testing 
import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { join } from 'path';
 
export function CreateJsonFile(){
//const projectPath = './'; // *** Replace with  Cypress Path ***
const folderName = 'TargetFolder'; 
const fileName = 'targetfile.json'; 


// Construct the full path to the file within the folder
const filePath = join(folderName, fileName);


// Get the current Unix timestamp
const unixTimestamp = Math.floor(Date.now() / 1000);

// Create an object with the timestamp
const data = {
  timestamp: unixTimestamp,
};

// Convert the object to JSON
const jsonData = JSON.stringify(data, null, 2); // The third parameter is for indentation (2 spaces in this case)

// Check if the folder exists
if (!existsSync(folderName)) {
    // If the folder doesn't exist, create it
    mkdirSync(folderName, { recursive: true });
    console.log(`Folder '${folderName}' created.`);
} 


// Check if the file exists
if (!existsSync(filePath)) {
    // If the file doesn't exist, create an sample  file
    writeFileSync(filePath, jsonData);
    console.log(`File '${fileName}' created in '${folderName}'.`);
} else {
    writeFileSync(filePath, jsonData);
    console.log(`File '${fileName}' already exists in '${folderName}'. Regenerating....`);
}
}
