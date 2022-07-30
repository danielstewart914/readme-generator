// modules
const fs = require( 'fs' );
const inquirer = require( 'inquirer' );

const generateMarkdown = require( './utils/generateMarkdown' );
const questions = require( './utils/questions' );

// write file 'data' to output folder
const writeToFile = ( fileName, data ) => {

    fs.writeFile( `./output/${ fileName }`, data, error => {

         error ? console.error( error ) : console.log( 'The file has been generated!' );

    } );
};

const queryUser = async questions => {

    try {

        const answers = await inquirer.prompt( questions );

        // write generated markdown to file using answers provided
        writeToFile( 'README.md', generateMarkdown( answers ) );

    } catch ( error ) {

        console.error( error );
        
    } 

};

const init = () => {

    // query user for info
    queryUser( questions );

};

// Function call to initialize app
init();