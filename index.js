const fs = require( 'fs' );


// TODO: Create an array of questions for user input
const questions = [];

// write file 'data' to output folder
const writeToFile = ( fileName, data ) => {

    fs.writeFile(`./output/${ fileName }`, data, ( error ) => {
        if ( error ) throw err;
        console.log( 'The file has been saved!' );
        } );
}

// TODO: Create a function to initialize app
function init() {}

// Function call to initialize app
init();