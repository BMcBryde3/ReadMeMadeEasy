// TODO: Include packages needed for this application
import inquirer from 'inquirer';
import fs from 'fs';
//imports the generateMarkdown function from generateMarkdown.js in the utils folder
import generateMarkdown from './utils/generateMarkdown.js';

// TODO: Create an array of questions for user input

const questions = ['What is the title of your project?', 'Please provide a description of your project.', 'Please provide installation instructions for your project.', 'Please provide usage information for your project.', 'Please provide contribution guidelines for your project.', 'Please provide test instructions for your project.', 'Please provide contact information for questions about your project.', 'Please select a license for your project.','Please enter your GitHub username.', 'Please enter your email address.'];


// TODO: Create a function to write README file
function writeToFile(fileName, data) {

    // writes the README file to the current directory
    fs.writeFile(fileName, data, (err) =>
        err ? console.error(err) : console.log('Success! Your README file has been generated.')
    );
}

// TODO: Create a function to initialize app
function init() {

    // prompts the user with a menu of questions
    // Menu option 1: Create New README
    // Menu option 3: Look at an example README
    // Menu option 2: Exit

   //Main menu: Press enter to trigger the inquirer prompt
    inquirer.prompt([
        {
            type: 'list',
            name: 'menu',
            message: 'WELCOME TO Read-Me-Made-Easy: Please select an option from the menu below:',
            choices: ['Create New README','Preview Sample','Exit'],
        },
        //takes the user's input and triggers the appropriate function
    ]).then((answers) => {
        if (answers.menu === 'Create New README') {
            inquirer.prompt([
                {
                    type: 'input',
                    name: 'title',
                    message: `${questions[0]}`,
                },
                {
                    type: 'input',
                    name: 'description',
                    message: `${questions[1]}`,
                },
                {
                    type: 'input',
                    name: 'installation',
                    message:`${questions[2]}`,
                },
                {
                    type: 'input',
                    name: 'usage',
                    message: `${questions[3]}`,
                },
                {
                    type: 'input',
                    name: 'contributing',
                    message: `${questions[4]}`,
                },
                {
                    type: 'input',
                    name: 'tests',
                    message: `${questions[5]}`,
                },
                {
                    type: 'enter',
                    name: 'questions',
                    message: `${questions[6]}`,
                },
                {
                    type: 'input',
                    name: 'github',
                    message: `${questions[8]}`,
                },
                {
                    type: 'input',
                    name: 'email',
                    message: `${questions[9]}`,
                },
                {
                    type: 'list',
                    name: 'license',
                    message: `${questions[7]}`,
                    choices: ['MIT', 'Apache', 'GPL', 'BSD', 'None'],
                }
                //takes the user's input and triggers the generateMarkdown function
            ]).then((answers) => {
                const fileName = './output/README.md';
            writeToFile(fileName, generateMarkdown(answers));
            }
            );
        } else if (answers.menu === 'Preview Sample') {
            // reads the sample README file from the utils folder and displays it in the console
            fs.readFile('./utils/sampleREADME.md', 'utf8', (err, data) => {
                if (err) {
                    console.error(err);
                    return;
                }
                console.log(data);
            });
            inquirer.prompt([
            {
                type: 'list',
                name: 'sampleMenu',
                message: 'Would you like to return to the Main Menu or Exit?',
                choices: ['MainMenu','Exit'],
            },
            //takes the user's input and triggers the appropriate function
           ]).then((answers) => {
                if (answers.sampleMenu === 'MainMenu') {
                    init();
                } else if (answers.sampleMenu === 'Exit') {
                    return;
                }
            }
            
            );
        }   else if (answers.menu === 'Exit') {
                return;
            }
    
}
    );
}

// Function call to initialize app
init();
