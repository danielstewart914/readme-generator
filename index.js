// modules
const fs = require( 'fs' );
const { EventEmitter } = require('events');
const inquirer = require( 'inquirer' );

const generateMarkdown = require( './utils/generateMarkdown' );
const questions = require( './utils/questions' );

const questioning = new EventEmitter();

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