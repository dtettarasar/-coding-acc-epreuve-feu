// Trouver le plus grand carré

const argTester = () => {

    const argument = process.argv.slice(2);
    const errorMsg = "erreur";
    const fileFormats = [".txt", ".md"];

    if (argument.length !== 1) {

        console.log(errorMsg);
        return false;

    } else {

        boardFilePath = argument[0];

    }

     // Check les formats de fichiers 
     if (!checkFileFormat(boardFilePath, fileFormats)) {
        console.log(errorMsg);
        return false;
    }

    console.log(boardFilePath);

}

const checkFileFormat = (filePath, formatArr) => {

    for (let i = 0; i < formatArr.length; i++) {

        if (filePath.endsWith(formatArr[i])) {
            return filePath;
        }

    }

    return false;

}

argTester();