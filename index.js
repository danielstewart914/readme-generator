const fs = require( 'fs' );
const generateMarkdown = require( './utils/generateMarkdown' );
const inquirer = require( 'inquirer' );
const { EventEmitter } = require('events');

const questioning = new EventEmitter();

const questions = [
    {
        type: 'input',
        message: 'Please enter your full name',
        name: 'userName',
    },
    {
        type: 'input',
        message: 'What is your email address?',
        name: 'email',
    },
    {
        type: 'input',
        message: 'What is your GitHub user name?',
        name: 'gitHub',
    },
    {
        type: 'input',
        message: 'What is the name of your project?',
        name: 'title',
    },
    {
        type: 'input',
        message: 'Please write a short description of your project:',
        name: 'description',
    },
    {
        type: 'list',
        message: 'Please select a license for this project',
        name: 'license',
        choices: [ 'MIT', 'Apache 2.0', 'GPL 3.0', 'BSD 3', 'None' ]
    },
    {
        type: 'input',
        message: 'What command should be run to install dependencies?',
        name: 'installation',
        default: 'npm i'
    },
    {
        type: 'input',
        message: 'What command should be run for tests?',
        name: 'tests',
        default: 'npm test'
    },
    {
        type: 'input',
        message: 'What does the user need to know about using this repo?',
        name: 'usage',
    },
    {
        type: 'input',
        message: 'What does the user need to know about contributing to this repo?',
        name: 'contributing',
    }
];

// write file 'data' to output folder
const writeToFile = ( fileName, data ) => {

    fs.writeFile( `./output/${ fileName }`, data, error => {

        if ( error ) console.log( error );
        else console.error( 'The file has been generated!' );

    } );
};

const queryUser = questions => {

    inquirer
    .prompt( questions )
    .then(  answers => questioning.emit( 'finished', answers ) )
    .catch( error  =>  console.error( error ) );

};

const init = () => {

    // when questioning is done write generated markdown to file using answers provided
    questioning.on( 'finished', answers => writeToFile( 'README.md', generateMarkdown( answers ) ) );

    // query user for info
    queryUser( questions );

};

// Function call to initialize app
init();