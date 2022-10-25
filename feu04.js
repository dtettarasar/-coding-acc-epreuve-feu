// Trouver le plus grand carré

const argTester = () => {

    const argument = process.argv.slice(2);
    const errorMsg = "erreur";

    if (argument.length !== 1) {

        console.log(errorMsg);
        return false;

    } else {

        boardFilePath = argument[0];

    }

    console.log(boardFilePath);

}

argTester();